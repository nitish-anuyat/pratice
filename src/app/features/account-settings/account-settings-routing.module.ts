import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings.component';
import { CurrencyComponent } from './component/currency/currency.component';
import { AccountComponent } from './component/account/account.component';

const routes: Routes = [
  {
    path:'',
    component: AccountSettingsComponent,
    children: [
      { path: 'account', component: AccountComponent},
      { path: 'currency', component: CurrencyComponent},
      { path: '', redirectTo: 'account', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
