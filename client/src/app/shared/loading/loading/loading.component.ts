import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  private _state: boolean;

  public showLoading(): void {
    this._state = true;
  }

  public hideLoading(): void {
    this._state = false;
  }

  public get state(): boolean {
    return this._state;
  }
}
