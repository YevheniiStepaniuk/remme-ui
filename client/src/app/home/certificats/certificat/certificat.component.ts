import { LoadingComponent } from './../../../shared/loading/loading/loading.component';
import { CertificatesService } from './../../../core/certificates/certificates.service';
import { PublicKey } from './../../../core/remme/public-key.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-certificat',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.scss']
})
export class CertificatComponent implements OnInit {
  @Input() public certificat: PublicKey;
  public loading: boolean;
  constructor(private certificatService: CertificatesService, private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.updateData();

    this.certificatService.revokeEvents.subscribe((status) => {
      if(status){
        this.snackBar.open(status);
      }
    });
  }

  public onRevoke(): void {
    this.certificatService.revoke(this.certificat.publicKey)
    .subscribe((data) => {
      console.log(data)
      this.updateData();
    });
  }

  public get isValid(): boolean {
    return this.certificat.valid && !this.certificat.revoked
  }

  private updateData(): void {
    this.loading = true;
    this.certificatService.loadData(this.certificat.key).subscribe((data) => {
      this.certificat.assign(data);
      this.loading = false;
    },
    () => this.loading = false
    );
  }
}
