import { TokensService } from './../../../core/tokens/tokens.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  public balance$: Observable<number>;

  constructor(private tokensService: TokensService) { }

  public ngOnInit(): void {
    this.balance$ = this.tokensService.initBalancePooling();
  }

}
