import { KeyStore } from './../core/auth/key-store.model';
import { AuthService } from './../core/auth/auth.service';
import { CertificatesService } from './../core/certificates/certificates.service';
import { RemmeService } from './../core/remme/remme.service';
import { Component, OnInit } from '@angular/core';
import { publicKeyToPem, } from 'remme-utils'
import {asn1, pkcs12, pki, util} from "node-forge";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: RemmeService,private cert: CertificatesService, private authSrtvice: AuthService) { }

  public ngOnInit(): void {
  }

  public logIn(){
    const prKey = "88138e38b679ea3ac1ceae6ef35372b10278316fc38b0b30b0537cb4324bfa47";
    const pKey = "031f5f199ed2bfb8bfc61350d02026dd6e99d8b96624458614f37f8327c4baa2f6" ;
    this.authSrtvice.logIn({
      privateKey: prKey,
      publicKey: pKey
    });
  }

  public onFileLoaded($event: KeyStore): void {
    this.authSrtvice.logIn($event);
  }
}

export const createP12 = ({ privateKey, certificate, passphrase }) => {
  const newPkcs12Asn1 =( <any>pkcs12).toPkcs12Asn1(
    privateKey, [certificate], passphrase,
    { generateLocalKeyId: true, friendlyName: 'test', algorithm: '3des' });
  const newPkcs12Der = asn1.toDer(newPkcs12Asn1).getBytes();
  return util.encode64(newPkcs12Der);
};

export const createLink = ({ p12 }) => {
  const pkcs12AsBlob = `data:application/x-pkcs12;base64,${p12}`;
  const downloadLink = document.createElement("a");
  downloadLink.download = "pkcs12.p12";
  downloadLink.innerHTML = "Download File";

  // downloadLink.href = window.URL.createObjectURL(pkcs12AsBlob);
  downloadLink.href = pkcs12AsBlob;
  downloadLink.onclick = () => document.body.removeChild(downloadLink);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();
};
