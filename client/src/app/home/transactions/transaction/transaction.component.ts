import { TransactionInfo } from './../../../core/transactions/transaction.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  @Input() public transaction: TransactionInfo;
}
