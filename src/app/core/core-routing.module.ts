import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { PageNotFoundComponent } from '../features/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from '../features/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../features/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path : '',
    component : CoreComponent,
    children : [
      { 
        path : '', loadChildren : () => import('../features/landing-page/landing-page.module').then(m => m.LandingPageModule)
      },
      { 
        path : 'my-plans', loadChildren: () => import('../features/my-plans/my-plans.module').then(m => m.MyPlansModule)
      },
      { 
        path : 'contact-us', loadChildren : () => import('../features/help/help.module').then(m => m.HelpModule)
      },
      { 
        path : 'request-support', loadChildren : () => import('../features/help/help.module').then(m => m.HelpModule)
      },
      { 
        path : 'FAQ', loadChildren : () => import('../features/faq-page/faq-page.module').then( m => m.FaqPageModule)
      },
      { 
        path : 'choose-destination', loadChildren : () => import('../features/choose-destination/choose-destination.module').then( m => m.ChooseDestinationModule)
      },
      { 
        path : 'plans', loadChildren : () => import('../features/plans-list/plans-list.module').then( m => m.PlansListModule)
      },
      { 
        path : 'payment-status', loadChildren : () => import('../features/payments/payments.module').then( m => m.PaymentsModule)
      },
      { path : 'installation', loadChildren : () => import('../features/installation-instructions/installation-instructions.module').then( m => m.InstallationInstructionsModule) },
      { path : 'privacy-policy', component: PrivacyPolicyComponent },
      { path : 'terms-and-conditions', component: TermsAndConditionsComponent },
      { 
        path : 'settings', loadChildren : () => import('../features/account-settings/account-settings.module').then(m => m.AccountSettingsModule)
      },
      { 
        path : 'rewards', loadChildren : () => import('../features/my-rewards/my-rewards.module').then(m => m.MyRewardsModule)
      },
      { 
        path : 'order-summary/:planId', loadChildren : () => import('../features/order-summary/order-summary.module').then(m => m.OrderSummaryModule)
      },
      { path : '**', component: PageNotFoundComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
