import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { SharedModule } from 'src/app/global/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { TrendingPlanComponent } from './component/trending-plan/trending-plan.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { MapSvgComponent } from './component/map-svg/map-svg.component';
import { PopularDestinationComponent } from './component/popular-destination/popular-destination.component';
import { ESimInfoComponent } from './component/e-sim-info/e-sim-info.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    TrendingPlanComponent,
    WelcomeComponent,
    CarouselComponent,
    MapSvgComponent,
    PopularDestinationComponent,
    ESimInfoComponent,
    TestimonialsComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    NgxGaugeModule,
    SharedModule
  ]
})
export class LandingPageModule { }
