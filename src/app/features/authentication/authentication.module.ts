import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { 
  CommonUiComponent,
  SigninComponent,
  SignupComponent,
  ResetPasswordComponent,
  ForgotPasswordComponent
} from './component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/global/shared.module';
import { AngularOtpLibModule } from 'src/lib/angular-otp-box';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { VerifyAccountComponent } from './component/verify-account/verify-account.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/global/state/user';

@NgModule({
  declarations: [
    AuthenticationComponent,
    CommonUiComponent,
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    SharedModule,
    AngularOtpLibModule,
    PasswordStrengthMeterModule.forRoot(),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class AuthenticationModule { }
