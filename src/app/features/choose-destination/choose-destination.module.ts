import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseDestinationRoutingModule } from './choose-destination-routing.module';
import { ChooseDestinationComponent } from './choose-destination.component';
import { SharedModule } from 'src/app/global/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChooseDestinationComponent
  ],
  imports: [
    CommonModule,
    ChooseDestinationRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ChooseDestinationModule { }
