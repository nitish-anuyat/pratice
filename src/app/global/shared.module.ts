import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SearchFilterPipe } from './custom-pipe';
import { 
  HeaderComponent,
  FooterComponent,
  PageTitleComponent,
  FaqComponent,
  LoaderComponent } from './component';
import { DialogService } from './service';
import { AlertComponent } from './dialog/alert/alert.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user';
import { ActivationEffects } from './state/subscriptions';
import { CurrencyEffects } from './state/currency';
import { DraggableDirective } from './directive/draggable.directive';

import { LottieModule } from 'ngx-lottie';
import { DateDifferencePipe } from './custom-pipe/date-difference.pipe';
import { ImportantComponent } from './dialog/important/important.component';
import { InternetUsagePipe } from './custom-pipe/internet-usage.pipe';
import { PaymentStatusComponent } from './dialog/payment-status/payment-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipDirective } from './directive/tooltip.directive';
import { CurrencyComponent } from './dialog/currency/currency.component';
import { CurrencySymbolPipe } from './custom-pipe/currency-symbol.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from '../features/page-not-found/page-not-found.component';

export function playerFactory(): any {  
  return import('lottie-web');
}
@NgModule({
  declarations: [
    SearchFilterPipe,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent,
    // DialogComponent,
    AlertComponent,
    FaqComponent,
    DraggableDirective,
    LoaderComponent,
    DateDifferencePipe,
    ImportantComponent,
    InternetUsagePipe,
    PaymentStatusComponent,
    TooltipDirective,
    CurrencyComponent,
    CurrencySymbolPipe,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([UserEffects, ActivationEffects, CurrencyEffects]),
    LottieModule.forRoot({ player: playerFactory }),
    TranslateModule
  ],
  exports:[
    SearchFilterPipe,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent,
    // DialogComponent,
    AlertComponent,
    FaqComponent,
    DraggableDirective,
    LoaderComponent,
    DateDifferencePipe,
    InternetUsagePipe,
    PaymentStatusComponent,
    TooltipDirective,
    CurrencyComponent,
    CurrencySymbolPipe,
    TranslateModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [DialogService]
    }
  }
  constructor() {
  }
  // public resolveComponent(component: any) {
  //   return this.componentFactoryResolver.resolveComponentFactory(component);
  // }
}
