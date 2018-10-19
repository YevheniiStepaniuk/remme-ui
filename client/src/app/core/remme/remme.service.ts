import { PublicKey } from './public-key.model';
import { Observable, from } from 'rxjs';
import {map} from 'rxjs/operators'
import { Injectable } from '@angular/core';
import * as Long from 'long';
import {Client} from 'remme';
import { INetworkConfig } from 'remme-rest';

@Injectable({
  providedIn: 'root'
})
export class RemmeService {
  private _client: Client;
  constructor() { }

  public init(key: string): void {
    this._client = new Client({
      privateKeyHex: key,
      networkConfig: this.initConfig
    })
1  }

  public get client(): Client {
    return this._client;
  }

  public getAvailablePublicKeys(pKey: string): Observable<PublicKey[]> {
    return from(
      this._client.publicKeyStorage.getUserPublicKeys(pKey)
    ).pipe(
      map((keys) => keys.map(key => new PublicKey({key}))
    )
    )
  }



  private get initConfig(): INetworkConfig {
    return {
      // nodeAddress: '52.186.121.68',
      nodeAddress: 'node-genesis-testnet.remme.io',
      nodePort: 8080,
      sslMode: false
    }
  }

}
