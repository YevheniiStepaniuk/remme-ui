import { AuthGuard } from './core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StickyDirective } from './shared/sticky.directive';

@NgModule({
  declarations: [
    AppComponent,
    StickyDirective
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path: 'login',
      loadChildren: './login/login.module#LoginModule'
    },
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule',
      canActivate: [AuthGuard]
    }],{
      useHash: true
    }),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
