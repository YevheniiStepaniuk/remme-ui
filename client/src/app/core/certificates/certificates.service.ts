import {asn1, pkcs12, pki, util} from "node-forge";
import { PublicKey } from './../remme/public-key.model';
import { RemmeService } from './../remme/remme.service';
import { CertificateData, CreateCertificateModel } from './certificate-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, Subject, interval, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, takeWhile } from 'rxjs/operators';
import { PublicKeyStorageCheckResult } from 'remme-public-key-storage/src/models/'
import { IBaseTransactionResponse } from 'remme-transaction-service';
import { BatchResult } from 'remme-batch/dist/models';
import { ICertificateTransactionResponse } from 'remme-certificate/dist/models';

@Injectable()
export class CertificatesService {
  private revokeSubject: BehaviorSubject <string> = new BehaviorSubject(null);
  constructor(
    private http: HttpClient,
    private remme: RemmeService) {}

  public getData(key: string): Observable<CertificateData> {
    return this.http.get<CertificateData>(this.dataUrl(key));
  }

  public check(key: string): Observable<PublicKeyStorageCheckResult> {
    const client = this.remme.client;
    return from(client.publicKeyStorage.check(key));
  }

  public loadData(key: string): Observable<PublicKey> {
    const result = new PublicKey({key});
    return this.getData(key).pipe(
      switchMap((data) => {
        result.assign(data.addressParse.payload);
        return this.check(data.addressParse.payload.publicKey)
      }),
      switchMap((checkResult: PublicKeyStorageCheckResult) => {
        result.assign(checkResult)
        return of(result);
      }));
  }

  public revoke(key: string): Observable<string> {
    const client = this.remme.client;
    from(client.publicKeyStorage.revoke(key))
    .subscribe(
      (revokeResponse: IBaseTransactionResponse) => {
        revokeResponse.connectToWebSocket((err, response: BatchResult) => {
          if(err) {
            this.revokeSubject.next(err);
            return;
          }
          this.revokeSubject.next(response.status)
          if(response.status == "PENDING") {
            interval(1000).pipe(switchMap(() => from(client.batch.getStatus(response.batch_id))))
            .pipe(
              tap((result: BatchResult) => {
                if(result.status != this.revokeSubject.value){
                  this.revokeSubject.next(result.status);
                }
              }),
              takeWhile((result: BatchResult) => {
              return result.status != "COMMITTED";
            })).subscribe();
          }
          revokeResponse.closeWebSocket();
        })
      });
    return this.revokeSubject.asObservable();
  }

  public create(model: CreateCertificateModel): Observable<any>{
    const client = this.remme.client;
    return from(client.certificate.createAndStore(model))
    .pipe(tap(
      (createResponse: ICertificateTransactionResponse) => {
        createResponse.connectToWebSocket((err, response) => {
          if(err) {
            this.revokeSubject.next(err);
            return;
          }
          const { certificate } = createResponse;
          const { privateKey } = certificate;
          this.downloadCertificate({certificate, privateKey});
          createResponse.closeWebSocket();
        })
      }));
  }

  public get revokeEvents(): Observable<string> {
    return this.revokeSubject.asObservable();
  }

  private dataUrl(key: string): string {
    return `https://blockexplorer.remme.io/api/state/${key}`;
  }

  private downloadCertificate(download: {certificate, privateKey}): void {
    const p12 = this.createP12(download);
    const link = this.createLink({p12});
    link.click();
  }

  private createP12({ privateKey, certificate }): string {
    // magic
    const newPkcs12Asn1 =( <any>pkcs12).toPkcs12Asn1(
      privateKey, [certificate], null,
      { generateLocalKeyId: true, friendlyName: 'test', algorithm: '3des' });
    const newPkcs12Der = asn1.toDer(newPkcs12Asn1).getBytes();
    return util.encode64(newPkcs12Der);
  }

  private createLink({ p12 }): HTMLAnchorElement{
    const pkcs12AsBlob = `data:application/x-pkcs12;base64,${p12}`;
    const downloadLink = document.createElement("a");
    downloadLink.download = "pkcs12.p12";
    downloadLink.innerHTML = "Download File";

    // downloadLink.href = window.URL.createObjectURL(pkcs12AsBlob);
    downloadLink.href = pkcs12AsBlob;
    downloadLink.onclick = () => document.body.removeChild(downloadLink);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    return downloadLink;
  };
}
