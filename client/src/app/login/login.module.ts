import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { FileHelpersModule } from 'ngx-file-helpers';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FileHelpersModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [LoginComponent, FileLoaderComponent]
})
export class LoginModule { }
