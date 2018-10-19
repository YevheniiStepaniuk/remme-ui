import { LoadingService } from './../../core/loading/loading.service';
import { LoadingComponent } from './../../shared/loading/loading/loading.component';
import { AuthService } from './../../core/auth/auth.service';
import { RemmeService } from './../../core/remme/remme.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('loading') loading: LoadingComponent;

  constructor(
    private authService: AuthService,
    private remmeService: RemmeService,
    private loadingService: LoadingService) { }

  public async ngOnInit() {
    const authData = this.authService.getAuthData();

    if(authData){
      this.remmeService.init(authData.privateKey);
    } else {
      this.authService.logOut();
    }

    this.loadingService.init(this.loading);

    const client = this.remmeService.client;
  }
}
