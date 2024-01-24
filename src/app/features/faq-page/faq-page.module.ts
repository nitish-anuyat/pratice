import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqPageRoutingModule } from './faq-page-routing.module';
import { FaqPageComponent } from './faq-page.component';
import { SharedModule } from 'src/app/global/shared.module';


@NgModule({
  declarations: [
    FaqPageComponent
  ],
  imports: [
    CommonModule,
    FaqPageRoutingModule,
    SharedModule
  ]
})
export class FaqPageModule { }
