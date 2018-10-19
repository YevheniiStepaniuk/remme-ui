import { KeyStore } from './key-store.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  public logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public logIn(keys: KeyStore): void {
    sessionStorage.setItem('user',JSON.stringify(keys));
    this.router.navigate(['/home']);
  }

  public getAuthData(): KeyStore {
    const fromSession = sessionStorage.getItem('user');
    if(fromSession) {
      return JSON.parse(fromSession);
    }
  }
}
