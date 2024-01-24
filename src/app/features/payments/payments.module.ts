import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { SharedModule } from 'src/app/global/shared.module';
import { PaymentStatusComponent } from './component/payment-status/payment-status.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaymentsRoutingModule,
    SharedModule
  ]
})
export class PaymentsModule { }
