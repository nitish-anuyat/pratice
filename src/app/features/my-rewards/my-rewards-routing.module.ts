import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRewardsComponent } from './my-rewards.component';

const routes: Routes = [
  { path: '', component: MyRewardsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRewardsRoutingModule { }
