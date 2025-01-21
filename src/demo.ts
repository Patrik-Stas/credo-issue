import type { Agent } from '@credo-ts/core';
import {
  createCredoTenantsAgent,
  createTenant,
  tenantCreateDidKey,
  tenantRequestAndStoreCredentials,
  tenantResolveCredentialOffer,
} from './agent-utils';
import type {AskarWalletSqliteStorageConfig} from "@credo-ts/askar/build/wallet";
import {ParadymClient} from "./paradym-client";

function generateRandomSecret(byteLength: number): string {
  const randomBytes = new Uint8Array(byteLength);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
}

async function setupTenant(rootAgent: Agent, userId: string) {
  const { id: tenantId } = await createTenant(rootAgent, userId);
  const randomSecret = generateRandomSecret(16);
  const { did } = await tenantCreateDidKey(rootAgent, tenantId, randomSecret);
  console.log(`Tenant ${tenantId} created DID: ${did}`);

  return { tenantId, didUrl: `${did}#${did.split(':').pop()}` };
}

async function issueTenantCredential(
  rootAgent: Agent,
  paradymClient: ParadymClient,
  userId: string,
  identityData: { name: string; surname: string }
) {
  const { tenantId, didUrl } = await setupTenant(rootAgent, userId);

  const paradymCredential = await paradymClient.createIdentityCredential(identityData);
  const issuance = await paradymClient.getCredential(paradymCredential.id);
  const credentialOffer = issuance.offerUri;
  console.log(`Going to accept credential from offer ${credentialOffer}`);

  const resolvedOffer = await tenantResolveCredentialOffer(rootAgent, tenantId, credentialOffer);
  await tenantRequestAndStoreCredentials(
    rootAgent,
    tenantId,
    resolvedOffer,
    didUrl,
    resolvedOffer.offeredCredentials.map((o: { id: string }) => o.id),
  );
}

async function main() {
  // Setup Paradym client
  const PARADYM_KEY = process.env.PARADYM_KEY;
  const PARADYM_PROJECT_ID = process.env.PARADYM_PROJECT_ID;
  const PARADYM_TEMPLATE_ID = process.env.PARADYM_TEMPLATE_ID;

  if (!PARADYM_KEY) {
    throw new Error('PARADYM_KEY environment variable is required');
  }
  if (!PARADYM_PROJECT_ID) {
    throw new Error('PARADYM_PROJECT_ID environment variable is required');
  }
  if (!PARADYM_TEMPLATE_ID) {
    throw new Error('PARADYM_TEMPLATE_ID environment variable is required');
  }

  const paradymClient = new ParadymClient(
      'https://api.paradym.id',
      PARADYM_KEY,
      PARADYM_PROJECT_ID,
      PARADYM_TEMPLATE_ID,
  );

  const sqliteWalletConfig: AskarWalletSqliteStorageConfig = {
    type: 'sqlite'
  };

  const rootAgent = createCredoTenantsAgent('root-wallet-demo', 'insecure-secret', sqliteWalletConfig);
  await rootAgent.initialize();

  // Stage 1: First tenant receives credential
  console.log('RUNNING STAGE 1');
  await issueTenantCredential(rootAgent, paradymClient, 'user1', {
    name: 'john',
    surname: 'doe',
  });

  // Stage 2: Second tenant receives credential
  console.log('RUNNING STAGE 2');
  await issueTenantCredential(rootAgent, paradymClient, 'user2', {
    name: 'michael',
    surname: 'jackson',
  });

  await rootAgent.shutdown();
}

main().catch(console.error);
