import { AskarModule } from '@credo-ts/askar';
import {
  Agent,
  type InitConfig,
  KeyType,
  TypedArrayEncoder,
  type WalletStorageConfig,
} from '@credo-ts/core';
import { agentDependencies } from '@credo-ts/node';
import { OpenId4VcHolderModule } from '@credo-ts/openid4vc';
import { TenantsModule } from '@credo-ts/tenants';
import { ariesAskar } from '@hyperledger/aries-askar-nodejs';

export function createCredoTenantsAgent(
  walletId: string,
  walletKey: string,
  walletStorageConfig: WalletStorageConfig,
): Agent {
  const config = {
    label: walletId,
    walletConfig: { id: walletId, key: walletKey, storage: walletStorageConfig },
  } satisfies InitConfig;

  const agent = new Agent({
    config,
    dependencies: agentDependencies,
    modules: {
      askar: new AskarModule({ ariesAskar }),
      tenants: new TenantsModule(),
      openId4VcHolder: new OpenId4VcHolderModule(),
    },
  });

  return agent;
}

export async function createTenant(agent: Agent, label: string) {
  return await agent.modules.tenants.createTenant({
    config: { label },
  });
}

export async function tenantCreateDidKey(agent: Agent, tenantId: string, secretPrivateKey: string) {
  const tenantAgent = await agent.modules.tenants.getTenantAgent({ tenantId });

  const didCreateResult = await tenantAgent.dids.create({
    method: 'key',
    options: { keyType: KeyType.Ed25519 },
    secret: { privateKey: TypedArrayEncoder.fromString(secretPrivateKey) },
  });

  if (!didCreateResult.didState.did) {
    throw new Error('DID not created');
  }

  const did = didCreateResult.didState.did;
  await tenantAgent.endSession();
  return { did };
}

export async function tenantResolveCredentialOffer(
  agent: Agent,
  tenantId: string,
  credentialOffer: string,
) {
  const tenantAgent = await agent.modules.tenants.getTenantAgent({ tenantId });
  const result = await tenantAgent.modules.openId4VcHolder.resolveCredentialOffer(credentialOffer);
  await tenantAgent.endSession();
  return result;
}

export async function tenantRequestAndStoreCredentials(
  agent: Agent,
  tenantId: string,
  resolvedCredentialOffer: any,
  didUrl: string,
  credentialsToRequest: string[],
) {
  const tenantAgent = await agent.modules.tenants.getTenantAgent({ tenantId });

  console.log('Requesting token');
  const tokenResponse = await tenantAgent.modules.openId4VcHolder.requestToken({
    resolvedCredentialOffer,
  });

  console.log('Requesting credentials');
  const credentialResponse = await tenantAgent.modules.openId4VcHolder.requestCredentials({
    resolvedCredentialOffer,
    ...tokenResponse,
    credentialsToRequest,
    credentialBindingResolver: didUrl
      ? async () => ({
          method: 'did',
          didUrl,
        })
      : undefined,
  });

  console.log('Storing credentials');
  const storedCredentials = await Promise.all(
    credentialResponse.map((response) => {
      return tenantAgent.sdJwtVc.store(response.credential.compact);
    }),
  );

  await tenantAgent.endSession();
  return storedCredentials;
}
