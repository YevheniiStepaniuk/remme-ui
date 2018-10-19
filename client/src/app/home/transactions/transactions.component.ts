import { LoadingService } from './../../core/loading/loading.service';
import { TransactionInfo } from './../../core/transactions/transaction.model';
import { TransactionsService } from './../../core/transactions/transactions.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public transactions: TransactionInfo[] = [];
  displayedColumns: string[] = ['txid', 'type'];
  constructor(private service:TransactionsService, private loading: LoadingService) { }

  ngOnInit() {
    this.fetchNextChunk();
  }


  public fetchNextChunk(): void {
    this.loading.show();
    const subsc = this.service.load()
    .subscribe((data) => {
      if(!data && !data.length) {
        subsc.unsubscribe();
      }
      this.loading.hide();
      this.transactions = this.transactions.concat(data)
      // this.fetchNextChunk();
    },
    () => this.loading.hide());
  }
}
