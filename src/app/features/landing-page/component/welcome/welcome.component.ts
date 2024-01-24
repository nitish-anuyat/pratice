import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyPlansService } from 'src/app/features/my-plans/service/my-plans.service';
import { BrowserService } from 'src/app/global/service';
import {  selectDataUsage, selectSubscriptionByStatus } from 'src/app/global/state/subscriptions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  public isBrowser: boolean;

  @Input() userDetails: any;

  dataUsage$ = this.store.select(selectDataUsage);
  dataUsage: any = undefined;

  activeSubscription$ = this.store.select(selectSubscriptionByStatus({ status : 'active'}));
  activeSubscription: any = undefined;

  usageInPercent = 0;
  

  constructor(@Inject(PLATFORM_ID) private platformId: any, private browserService: BrowserService, private store: Store, private myPlanService : MyPlansService) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(isPlatformBrowser(platformId));

    this.dataUsage$.subscribe(details => {
      this.dataUsage = details;
      this.usageInPercent = this.dataUsage?.remaining_data_in_MB ? 
        Number(((this.dataUsage.used_data_size_in_MB/ this.dataUsage.total_data_size_in_MB) * 100).toFixed(2)) : 0;

    });
    
    this.activeSubscription$.subscribe(details => this.activeSubscription = details[0] );
  }


  ngOnInit(): void {
    // this.getActivePlanDetails();
  }

  getActivePlanDetails(){
    this.myPlanService.getMyPlans('active').subscribe((plans : any) => {
      if(plans?.length > 0) this.activeSubscription = plans[0];
    })
  }
}
