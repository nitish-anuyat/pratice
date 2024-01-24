import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '../global/shared.module';
import { PrivacyPolicyComponent } from '../features/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../features/terms-and-conditions/terms-and-conditions.component';
import { AccountSettingsModule } from '../features/account-settings/account-settings.module';


@NgModule({
  declarations: [
    CoreComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    AccountSettingsModule,
  ]
})
export class CoreModule { }
