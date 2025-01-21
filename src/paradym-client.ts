import axios, { type AxiosInstance } from 'axios';

interface IdentityCredentialAttributes {
  name: string;
  surname: string;
}

interface CredentialResponse {
  id: string;
  offerUri: string;
}

export class ParadymClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseURL: string,
    accessToken: string,
    private readonly projectId: string,
    private readonly templateId: string,
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': accessToken,
      },
    });
  }

  public async createIdentityCredential(
    attributes: IdentityCredentialAttributes,
  ): Promise<CredentialResponse> {
    const request = {
      credentials: [
        {
          credentialTemplateId: this.templateId,
          attributes,
        },
      ],
    };

    const response = await this.axiosInstance.post<CredentialResponse>(
      `/v1/projects/${this.projectId}/openid4vc/issuance/offer`,
      request,
    );
    return response.data;
  }

  public async getCredential(issuanceId: string): Promise<CredentialResponse> {
    const response = await this.axiosInstance.get<CredentialResponse>(
      `/v1/projects/${this.projectId}/openid4vc/issuance/${issuanceId}`,
    );
    return response.data;
  }
}
