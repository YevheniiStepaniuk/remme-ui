export class CertificateData {
  public address: string;
  public addressParse: {
    owner: string;
    payload: PublicKeyPayload;
  };
}

export class PublicKeyPayload {
  public publicKey: string;
  public validFrom: number;
  public validTo: number;
}


export class CreateCertificateModel {
  public commonName: string;
  public serial: string;
  public email: string;
  public validity: number;
  public name: string;
  public surname: string;
}
