import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRewardsRoutingModule } from './my-rewards-routing.module';
import { MyRewardsComponent } from './my-rewards.component';
import { RewardPointsComponent } from './component/reward-points/reward-points.component';
import { TransactionHistoryComponent } from './component/transaction-history/transaction-history.component';
import { SharedModule } from 'src/app/global/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard'

@NgModule({
  declarations: [
    MyRewardsComponent,
    RewardPointsComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    MyRewardsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ClipboardModule
  ]
})
export class MyRewardsModule { }
