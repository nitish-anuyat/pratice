import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPlansComponent } from './my-plans.component';
import { ActiveComponent } from './component/active/active.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { ExpiredComponent } from './component/expired/expired.component';

const routes: Routes = [
  { 
    path : '', component: MyPlansComponent, 
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active'},
      { path: 'active', component: ActiveComponent },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'expired', component: ExpiredComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPlansRoutingModule { }
