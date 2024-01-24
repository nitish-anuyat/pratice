import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BrowserService, DialogService } from 'src/app/global/service';
import { isPlatformBrowser } from '@angular/common';
import { PlanDetailsComponent } from 'src/app/features/plans-list/component/plan-details/plan-details.component';
import { selectSubscriptionByStatus } from 'src/app/global/state/subscriptions';
import { Store } from '@ngrx/store';
import { PurchaseDetailsComponent } from '../purchase-details/purchase-details.component';

@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent implements OnInit{
  
  public isBrowser: boolean;
  expiredPlans: Array<any> = [];
  inProgress = false;
  showAll = false;

  expiredSubscription$ = this.store.select(selectSubscriptionByStatus({ status : 'expired/refunded'}));
  
  constructor(@Inject(PLATFORM_ID) private platformId: any, 
              private browserService: BrowserService,
              private dialogService: DialogService,
              private store : Store) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    // this.inProgress = true;
    // this.myplanService.getMyPlans('expired').subscribe((plans: any) => { 
    //   this.expiredPlans = plans;

    //   this.expiredPlans.forEach((plan: any) => {
    //     if(plan.iso3code) {
    //       let flagNameInLower = plan.iso3code
    //       flagNameInLower = flagNameInLower.toLowerCase()
    //       plan.flag = `assets/flags/${flagNameInLower}.svg`   
    //     }
    //   })

    //   this.inProgress = false;
    // })
    this.getExpiredPlans();
  }

  buyAgain(plan : any){
    this.dialogService.openModal(PlanDetailsComponent, { context: {planDetail: plan, isFromExpired : true}, cssClass: 'modal-vw-35' });
  }

  trackPlan(index: any, item : any) {
    return item._id;
  }

  getExpiredPlans(){
    this.inProgress = true;
    this.expiredSubscription$.subscribe((plans : any) => {
      this.expiredPlans = JSON.parse(JSON.stringify(plans));

      this.expiredPlans = this.expiredPlans.map((plan: any) => {
        if(plan.iso3code) {
          let flagNameInLower = plan.iso3code
          flagNameInLower = flagNameInLower.toLowerCase()
          plan = { ...plan, flag: `assets/flags/${flagNameInLower}.svg`};
        }
        return plan;
      });

      this.inProgress = false;
    })
  }

  handleEvent(event : any){
    if(event?.event == 'showPurchaseDetails'){
      this.dialogService.openModal(PurchaseDetailsComponent, { context: { planDetails: event.details }, cssClass: 'modal-vw-35 modal-md-vw-45'}).subscribe(
        (event : any) => {
          this.handleEvent(event);
        }
      );
    } else if(event?.event == 'buyAgain'){
      this.buyAgain(event.details);
    }
  }
}
