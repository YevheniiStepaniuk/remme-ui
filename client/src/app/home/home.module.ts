import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
} from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CertificatsComponent } from './certificats/certificats.component';
import { TokensComponent } from './tokens/tokens.component';
import { CertificatComponent } from './certificats/certificat/certificat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateModalComponent } from './certificats/create-modal/create-modal.component';
import { FormsModule } from '@angular/forms';
import { TransferComponent } from './tokens/transfer/transfer.component';
import { BalanceComponent } from './tokens/balance/balance.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HeaderComponent } from './transactions/header/header.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { ShareComponent } from './tokens/share/share.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    ClipboardModule
  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
    CertificatsComponent,
    TokensComponent,
    CertificatComponent,
    DashboardComponent,
    CreateModalComponent,
    TransferComponent,
    BalanceComponent,
    TransactionsComponent,
    HeaderComponent,
    TransactionComponent,
    ShareComponent
  ],
  entryComponents: [
    CreateModalComponent
  ]
})
export class HomeModule { }
