import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  key: string;
  constructor(private authService: AuthService, private clService: ClipboardService) { }

  ngOnInit() {
    this.key = this.authService.getAuthData().publicKey;
  }

  public copy(){
    this.clService.copyFromContent(this.key)
  }
}
