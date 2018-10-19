import { TokensService } from './../../../core/tokens/tokens.service';
import { NgForm } from '@angular/forms';
import { TransferModel } from './../../../core/tokens/tokens-transfer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  public transferModel: TransferModel = new TransferModel();
  @ViewChild('transferForm') form: NgForm;
  constructor(private tokens: TokensService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public transfer(): void {
    if(this.form.valid){
      this.tokens.transfer(this.transferModel).subscribe((event) => {
        if(event){
          this.snackBar.open(event, "Close");
        }
      })
    }
  }

}
