import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansListRoutingModule } from './plans-list-routing.module';
import { PlansListComponent } from './plans-list.component';
import { SharedModule } from 'src/app/global/shared.module';
import { PlanService } from './service/plan.service';
import { PlanDetailsComponent } from './component/plan-details/plan-details.component';


@NgModule({
  declarations: [
    PlansListComponent,
    PlanDetailsComponent
  ],
  imports: [
    CommonModule,
    PlansListRoutingModule,
    SharedModule
  ],
  providers: [
    PlanService
  ]
})
export class PlansListModule { }
