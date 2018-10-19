import { AuthService } from './../auth/auth.service';
import { TransactionInfo } from './transaction.model';
import { Observable, from } from 'rxjs';
import { RemmeService } from '../remme/remme.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TransactionList } from 'remme-blockchain-info/dist/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private remmeService: RemmeService,
    public auth: AuthService) { }

  public load(count?: number, skip?: number): Observable<TransactionInfo[]> {
    const client = this.remmeService.client;
    const pKey = this.auth.getAuthData().publicKey;
    return from(client.blockchainInfo.getTransactions({
      limit: count,
      start: skip
    })).pipe(map((transactions: TransactionList) => {
      return transactions.data
      .filter((transaction) => transaction.header.signer_public_key == pKey)
      .map(transaction => {
        return {
          type: transaction.transactionType,
          txid: transaction.header_signature
        }
      });
    }));
  }
}
