import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsComponent } from './account-settings.component';
import { PersonalInformationComponent } from './component/personal-information/personal-information.component';
import { SharedModule } from "../../global/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { AngularOtpLibModule } from "../../../lib/angular-otp-box/lib/angular-otp-box.module";
import { AccountComponent } from './component/account/account.component';
import { CurrencyComponent } from './component/currency/currency.component';


@NgModule({
    declarations: [
        AccountSettingsComponent,
        PersonalInformationComponent,
        ChangePasswordComponent,
        AccountComponent,
        CurrencyComponent
    ],
    imports: [
        CommonModule,
        AccountSettingsRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AngularOtpLibModule
    ]
})
export class AccountSettingsModule { }
