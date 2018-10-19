export class PublicKey {
  public key: string;
  public valid: boolean;
  public revoked: boolean;
  public publicKey: string;
  public validTo: number;
  public validFrom: number;

  constructor(init?: Partial<PublicKey>) {
    Object.assign(this, init);
  }

  public assign(init?: Partial<PublicKey>): void {
    Object.assign(this, init);
  }
}
