import { CreateModalComponent } from './create-modal/create-modal.component';
import { AuthService } from './../../core/auth/auth.service';
import { PublicKey } from './../../core/remme/public-key.model';
import { LoadingService } from './../../core/loading/loading.service';
import { RemmeService } from './../../core/remme/remme.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-certificats',
  templateUrl: './certificats.component.html',
  styleUrls: ['./certificats.component.scss']
})
export class CertificatsComponent implements OnInit {
  public certificates: PublicKey[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private remmeService: RemmeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private loading: LoadingService) {}

  public ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(): void {
    this.loading.show();
    const pKey = this.authService.getAuthData().publicKey;
    this.remmeService
      .getAvailablePublicKeys(pKey)
      .subscribe((keys) => this.certificates = keys, null, () => this.loading.hide());
  }

  public createCertificate(): void{
    this.dialog.open(CreateModalComponent)
  }
}
