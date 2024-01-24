import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListComponent } from './plans-list.component';

const routes: Routes = [{
  path: ':countryName', component: PlansListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansListRoutingModule { }
