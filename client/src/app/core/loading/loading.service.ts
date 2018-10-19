import { LoadingComponent } from './../../shared/loading/loading/loading.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading: LoadingComponent;

  public init(loading: LoadingComponent): void {
    this._loading = loading;
  }

  public show(): void {
    if(this._loading){
      this._loading.showLoading();
    }
  }

  public hide(): void {
    if(this._loading){
      this._loading.hideLoading();
    }
  }
}
