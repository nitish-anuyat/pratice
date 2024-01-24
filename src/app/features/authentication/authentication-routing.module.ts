import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { VerifyAccountComponent } from './component/verify-account/verify-account.component';
import { ForgotPasswordComponent, ResetPasswordComponent, SigninComponent, SignupComponent } from './component';

const routes: Routes = [{ 
  path: '', 
  component: AuthenticationComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'signin'},
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verify', component: VerifyAccountComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
