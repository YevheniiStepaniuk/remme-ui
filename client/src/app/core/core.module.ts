import { TransactionsService } from './transactions/transactions.service';
import { TokensService } from './tokens/tokens.service';
import { AuthGuard } from './guards/auth.guard';
import { LoadingService } from './loading/loading.service';
import { AuthService } from './auth/auth.service';
import { CertificatesService } from './certificates/certificates.service';
import { RemmeService } from './remme/remme.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    RemmeService,
    CertificatesService,
    AuthService,
    LoadingService,
    AuthGuard,
    TokensService,
    TransactionsService
  ]
})
export class CoreModule { }
