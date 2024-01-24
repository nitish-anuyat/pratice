import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyPlansService } from './service/my-plans.service';
import { AlertService } from 'src/app/global/service';
import { selectAllSubscription } from 'src/app/global/state/subscriptions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss']
})
export class MyPlansComponent implements OnInit{
  selectedSection = 'active';
  upcomingPlansCount = 0;
  expiredPlansCount = 0;
  activePlansCount = 0;

  subscriptions$ = this.store.select(selectAllSubscription)

  constructor(private router: Router, 
              private myplanService: MyPlansService, 
              private alertService: AlertService,
              private store: Store){
    this.selectedSection = router.url.replace('/my-plans/', '');
    this.myplanService.setActiveTab(this.selectedSection);
    // console.log(router.url)
    // this.myplanService.upcomingPlans$.subscribe(plans => {
    //   console.log(plans)
    //   this.upcomingPlansCount = plans.length;
    // })
    // this.myplanService.expiredPlans$.subscribe(plans => {
    //   this.expiredPlansCount = plans.length;
    //   console.log(plans)
    // })
    // this.myplanService.activePlan$.subscribe(plans => {
    //   this.activePlansCount = plans.length;
    //   console.log(plans)
    // })

    // combineLatest(this.myplanService.getPlansCount()).subscribe((result : any) => {
    //   if(result) {
    //     this.activePlansCount = result[0].length;
    //     this.upcomingPlansCount = result[1].length;
    //     this.expiredPlansCount = result[2].length;
    //   }
    // }, 
    // error => {
    //   this.alertService.error(error)
    // });

    this.myplanService.getActiveTab().subscribe((activeTab) => { 
      this.selectedSection= activeTab;
      this.getUpdatedCount();
    });
  }

  ngOnInit() {
    this.getUpdatedCount();    
  }

  
  switchTab(status:string) {
    this.selectedSection = status;
    this.myplanService.setActiveTab(this.selectedSection);
  }
  
  getUpdatedCount(){
    this.subscriptions$.subscribe((subscriptions: Array<any>) => {
      this.activePlansCount = subscriptions.filter((plan : any) => plan.status == 'active')?.length || 0 ;
      this.upcomingPlansCount = subscriptions.filter((plan : any) => plan.status == 'upcoming')?.length || 0; 
      this.expiredPlansCount = subscriptions.filter((plan : any) => plan.status == 'expired' || plan.status == 'refunded')?.length || 0 ;
    })
  }
}
