import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseDestinationComponent } from './choose-destination.component';

const routes: Routes = [
  { path: '', component: ChooseDestinationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseDestinationRoutingModule { }
