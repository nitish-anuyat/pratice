import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPlansRoutingModule } from './my-plans-routing.module';
import { SharedModule } from 'src/app/global/shared.module';
import { MyPlansComponent } from './my-plans.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { ActiveComponent } from './component/active/active.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { ExpiredComponent } from './component/expired/expired.component';
import { PurchaseDetailsComponent } from './component/purchase-details/purchase-details.component';
import { ActivePlanComponent, ExpiredPlanComponent, UpcomingPlanComponent } from './component/plan';

@NgModule({
  declarations: [MyPlansComponent, ActiveComponent, UpcomingComponent, ExpiredComponent, PurchaseDetailsComponent, ActivePlanComponent, ExpiredPlanComponent, UpcomingPlanComponent],
  imports: [
    CommonModule,
    MyPlansRoutingModule,
    NgxGaugeModule,
    SharedModule
  ]
})
export class MyPlansModule { }
