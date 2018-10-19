import { TransferModel } from './tokens-transfer.model';
import { BatchResult } from 'remme-batch/dist/models';
import { IBaseTransactionResponse } from 'remme-transaction-service';
import { AuthService } from './../auth/auth.service';
import { switchMap, tap, takeWhile } from 'rxjs/operators';
import { Subject, Observable, interval, from, BehaviorSubject } from 'rxjs';
import { RemmeService } from './../remme/remme.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private transferSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private remme: RemmeService, private authService: AuthService) {}

  public initBalancePooling(): Observable<number> {
    const client = this.remme.client;
    return interval(1000).pipe(
      switchMap(() => client.token.getBalance(this.publicKey))
    );
  }

  public transfer({key, amount}: TransferModel): Observable<string> {
    const client = this.remme.client;
    from(client.token.transfer(key, amount))
    .subscribe((revokeResponse: IBaseTransactionResponse) => {
      revokeResponse.connectToWebSocket((err, response: BatchResult) => {
        if(err) {
          this.transferSubject.next(err);
          return;
        }
        this.transferSubject.next(response.status);
        if(response.status == "PENDING") {
          interval(1000).pipe(switchMap(() => from(client.batch.getStatus(response.batch_id))))
          .pipe(
            tap((result: BatchResult) => {
              if(result.status != this.transferSubject.value){
                this.transferSubject.next(result.status);
              }
            }),
            takeWhile((result: BatchResult) => result.status != "COMMITTED"))
            .subscribe();
        }
        revokeResponse.closeWebSocket();
      })
    });

    return this.transferSubject.asObservable();
  }

  public get publicKey(): string {
    return this.authService.getAuthData().publicKey;
  }
}
