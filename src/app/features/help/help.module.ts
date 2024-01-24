import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { SharedModule } from 'src/app/global/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestSupportComponent } from './component/request-support/request-support.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HelpService } from './service/help.service';
import { ThanksComponent } from './component/thanks/thanks.component';


@NgModule({
  declarations: [
    HelpComponent,
    RequestSupportComponent,
    ContactUsComponent,
    ThanksComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    HelpService
  ]
})
export class HelpModule { }
