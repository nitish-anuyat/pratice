import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AlertService, BrowserService, DialogService } from 'src/app/global/service';
import { MyPlansService } from '../../service/my-plans.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportantComponent } from 'src/app/global/dialog/important/important.component';
import { Store } from '@ngrx/store';
import { selectSubscriptionByStatus } from 'src/app/global/state/subscriptions';
import { PurchaseDetailsComponent } from '../purchase-details/purchase-details.component';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit{
  public isBrowser: boolean;
  upcomingPlans: Array<any> = [];
  inProgress = false;
  showAll = false;

  upcomingSubscription$ = this.store.select(selectSubscriptionByStatus({ status : 'upcoming'}));

  constructor(@Inject(PLATFORM_ID) private platformId: any, 
              private browserService: BrowserService, 
              private myplanService: MyPlansService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private store: Store) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    // this.inProgress = true;
    // this.myplanService.getMyPlans('upcoming').subscribe((plans: any) => { 
    //   this.upcomingPlans = plans;
    //   this.upcomingPlans.forEach((plan: any) => {
    //     if(plan.iso3code) {
    //       let flagNameInLower = plan.iso3code
    //       flagNameInLower = flagNameInLower.toLowerCase()
    //       plan.flag = `assets/flags/${flagNameInLower}.svg`   
    //     }
    //   })
    //   this.inProgress = false;
    // })
    this.getUpcomingPlans();
  }

  navigateToInstallation(plan: any) {
    // this.router.navigate(['/installation', plan._id], {relativeTo: this.route})
    localStorage.setItem('upcomingPlan', JSON.stringify(plan));
    this.router.navigate(['/installation'], {relativeTo: this.route});
  }

  activateNow(plan: any) {
    // this.inProgress = true;
    this.dialogService.openModal(ImportantComponent, { context: { body: 'installation.activate_one_plan_message', upcomingActivate: true, plan: plan } }).subscribe(result => { 
      if(result) {
        this.myplanService.setActiveTab('active');
        // this.store.dispatch(setSubscriptionStatus({...plan, status: 'active'}));
      }
    });
    // this.myplanService.activateNowUpcomingPlan(plan).subscribe((response: any) => { 
    //   console.log(response);
    //   this.router.navigate(['/my-plans/active'])
    //   // this.alertService.success(response.message);
    //   this.inProgress = false;
    // }, 
    // error => {
    //   this.inProgress = false;
    //   this.alertService.error(error.error.message)
    // })
  }

  trackPlan(index: any, item : any) {
    return item._id;
  }

  getUpcomingPlans(){
    this.inProgress = true;
    this.upcomingSubscription$.subscribe((plans : any) => {
      this.upcomingPlans = JSON.parse(JSON.stringify(plans));
      this.upcomingPlans = this.upcomingPlans.map((plan: any) => {
        if(plan.iso3code) {
          let flagNameInLower = plan.iso3code
          flagNameInLower = flagNameInLower.toLowerCase()
          plan = {...plan, flag :`assets/flags/${flagNameInLower}.svg`};
        }
        return plan;
      })
      this.inProgress = false;
    });
  }
  
  handleEvent(event : any){
    if(event?.event == 'showPurchaseDetails'){
      this.dialogService.openModal(PurchaseDetailsComponent, { context: { planDetails: event.details }, cssClass: 'modal-vw-35 modal-md-vw-45'}).subscribe(
        (event : any) => {
          this.handleEvent(event);
        }
      );
    } else if(event?.event == 'toInstall'){
      this.navigateToInstallation(event.details);
    } else if(event?.event == 'activeNow'){
      this.activateNow(event.details);
    }
  }
}