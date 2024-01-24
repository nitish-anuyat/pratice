import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AlertService, BrowserService, DialogService } from 'src/app/global/service';
import { selectDataUsage, selectSubscriptionByStatus } from 'src/app/global/state/subscriptions';
import { Store } from '@ngrx/store';
import { PurchaseDetailsComponent } from '../purchase-details/purchase-details.component';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit{
  public isBrowser: boolean;
  activePlan: any;
  inProgress = false;
  totalData!: number;
  usedData!: number;
  usedDataForGuage!: number;
  
  activeSubscription$ = this.store.select(selectSubscriptionByStatus({ status : 'active'}));
  
  dataUsage$ = this.store.select(selectDataUsage);
  dataUsage: any = undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: any, 
              private browserService: BrowserService,
              private alertService: AlertService,
              private store: Store,
              private dialogService: DialogService) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(isPlatformBrowser(platformId));

    this.getDataUsage();

  }

  ngOnInit() {
    
    // this.myplanService.getMyPlans('active').subscribe((plans: any) => { 
    //   this.activePlan = plans[0];

    //   if(this.activePlan && this.activePlan.iso3code) {
    //     let flagNameInLower = this.activePlan.iso3code
    //     flagNameInLower = flagNameInLower.toLowerCase()
    //     this.activePlan.flag = `assets/flags/${flagNameInLower}.svg` 
    //   }
  
    //   // this.inProgress = false
    // }, 
    // error => {
    //   // this.inProgress = false;
    //   this.alertService.error(error.error.message)
    // })

    this.getActivePlan();

  }

  getDataUsage() {
    // this.inProgress = true
    // this.myplanService.getDataUsage().subscribe((dataUsage: any) => { 
    //   this.totalData = dataUsage.total_data_size_in_MB
    //   this.activePlan.totalData = this.totalData
    //   this.usedData = dataUsage.used_data_size_in_MB
    //   this.usedDataForGuage = Number(((this.usedData / this.totalData) * 100).toFixed(2))
    //   this.inProgress = false
    // }, 
    // error => {
    //   this.inProgress = false;
    //   this.alertService.error(error.error.message)
    // })
    this.dataUsage$.subscribe(details => {
      this.inProgress = true;
      this.dataUsage = details;
      this.totalData = this.dataUsage?.total_data_size_in_MB
      this.usedData = this.dataUsage?.used_data_size_in_MB
      this.usedDataForGuage = this.dataUsage?.remaining_data_in_MB ? 
      Number(((this.usedData/this.totalData) * 100).toFixed(2)) : 0;
      // setTimeout(() => {
        this.inProgress = false;
      // }, 200)
    });
  }

  getActivePlan(){
    this.inProgress = true;
    this.activeSubscription$.subscribe((plans : any) => {
      if(plans.length > 0) {
        this.activePlan = JSON.parse(JSON.stringify(plans[0]));
        // this.activePlan = plans[0];
        // this.usedData = 0
        // this.totalData = this.activePlan?.totalData
        if(this.activePlan && this.activePlan.iso3code) {
          let flagNameInLower = this.activePlan.iso3code;
          flagNameInLower = flagNameInLower.toLowerCase();
          this.activePlan.flag = `assets/flags/${flagNameInLower}.svg`; 
        }
      } 
      this.inProgress = false;
    }, 
    (error : any)=>{
      this.inProgress = false;
      this.alertService.error(error.error.message)
    });
  }

  handleEvent(event : any){
    if(event == 'showPurchaseDetails') this.dialogService.openModal(PurchaseDetailsComponent, { context: {planDetails: this.activePlan }, cssClass: 'modal-vw-35 modal-md-vw-45'});
  }
}
