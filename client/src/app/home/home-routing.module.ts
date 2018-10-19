import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokensComponent } from './tokens/tokens.component';
import { CertificatsComponent } from './certificats/certificats.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'certificats',
      component: CertificatsComponent
    },
    {
      path: 'tokens',
      component: TokensComponent
    },
    {
      path: '',
      component: DashboardComponent
    },
    {
      path:'transactions',
      component: TransactionsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
