import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ConfigService, DialogComponent, DialogService, LocalStorageService, SubscriptionsService } from '../../service';
import { ImportantComponent } from '../important/important.component';
import { MyPlansService } from 'src/app/features/my-plans/service/my-plans.service';
import { Store } from '@ngrx/store';
import { addSubscription, setDataUsageDetails, setSubscriptionStatus } from '../../state/subscriptions';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  transactionId !: string;
  country !: string;
  stripeProductId !: string;
  dialogRef: DialogComponent;
  isActivate: any = true;
  activeForm = new FormGroup({
    active: new FormControl('now'),
  });
  planDetails: any;
  inProgress = true;
  rewardPointsDetails : any = {
    points : 200,
    amount : 5
  };
  couponDetails : any = {
    code : '5OFFON',
    amount : 5
  };
  configData: any;

  constructor(private viewContainer: ViewContainerRef, 
              private dialogService: DialogService, 
              private subscriptionsService: SubscriptionsService,
              private router: Router,
              private alertService: AlertService,
              private myplanService: MyPlansService,
              private store: Store,
              private configService: ConfigService,
              private localStorage: LocalStorageService) {
    const _injector = this.viewContainer.injector;
    this.dialogRef = _injector.get<DialogComponent>(DialogComponent);

    configService.getLocalConfig().subscribe((configData : any) => {
      this.configData = configData;
    });
  }

  ngOnInit() {
    // this.planDetails = JSON.parse(localStorage.getItem('plan')!)
    if(this.transactionId != ''){
      this.addUpcomingPlanForSubscription()
    } else {
      this.inProgress = false;
    }
  }

  addUpcomingPlanForSubscription() {
    const obj = {
      stripeProductId: this.stripeProductId,
      country: this.country,
      transactionId : this.transactionId
    }
    this.subscriptionsService.addUpcomingPlanForSubscription(obj).subscribe((res) => {
      this.planDetails = res
      this.inProgress = false;
      this.store.dispatch(addSubscription({...this.planDetails}));
    }, 
    error => {
      this.inProgress = false;
      this.alertService.error(error.error.message)
    })
  }

  /*
  continueOld() {
    if(this.transactionId != '' && this.activeForm.value.active == 'manual') {
      this.router.navigate(['/my-plans/upcoming'], { replaceUrl: true });
      this.dialogRef.close.emit();
    }
    else if(this.transactionId != '' && this.activeForm.value.active == 'now') {
      // this.inProgress = true;
      // this.myplanService.activateNowUpcomingPlan(this.planDetails).subscribe((response: any) => { 
      //   if(response) {
      //     this.inProgress = false;
      //     this.dialogRef.close.emit();
      //     this.dialogService.openModal(ImportantComponent, { context: { transactionId : this.transactionId, active: true }, cssClass: 'bg-transparent' })
      //     this.router.navigate(['/installation'], { replaceUrl: true });
      //   }/////
      // }, 
      // error => {
      //   this.inProgress = false;
      //   this.alertService.error(error.error.message)
      // })
      if(this.planDetails.newEsim) {
          this.dialogService.openModal(ImportantComponent, { context: { transactionId : this.transactionId, active: true }, cssClass: 'bg-transparent' })
          this.dialogRef.close.emit();
      } else {
        this.dialogService.openModal(ImportantComponent, { context: { body: 'If you can activate this plan while another plan is active, your current plan will be cancelled, as you can only have one active plan at a time.', isNewICCID: this.planDetails.newEsim, plan: this.planDetails} }).subscribe((res) => {
          if(res) this.dialogRef.close.emit();
        })
        // this.dialogRef.close.emit();
      }
    }
    else if(this.transactionId != ''){
      this.dialogRef.close.emit();
      this.dialogService.openModal(ImportantComponent, { context: { transactionId : this.transactionId, active: true }, cssClass: 'bg-transparent' })
      this.router.navigate(['/installation'], { replaceUrl: true });
    } else if(this.transactionId == ''){
      this.dialogRef.close.emit();
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
  */

  continue() {
    if(this.transactionId != '' && this.activeForm.value.active == 'now') {
      
      if(this.planDetails.newEsim) {
        this.inProgress = true;
        this.myplanService.activateNowUpcomingPlan(this.planDetails).subscribe((response: any) => { 
          if(response) {
            this.inProgress = false;
            this.store.dispatch(setSubscriptionStatus({...this.planDetails, status: 'active'}));
            this.store.dispatch(setDataUsageDetails());
            this.localStorage.setItem('upcomingPlan', JSON.stringify(this.planDetails));
            this.dialogRef.closeEvent.emit();
            this.dialogService.openModal(ImportantComponent, { context: { transactionId : this.transactionId, active: true, newSim: this.planDetails.newEsim, plan: this.planDetails }, cssClass: 'bg-transparent' })
            this.router.navigate(['/installation'], { replaceUrl: true });
          }
        }, 
        error => {
          this.inProgress = false;
          this.alertService.error(error.error.message)
        })
      } 
      else {
        this.dialogService.openModal(ImportantComponent, { context: { body: 'installation.activate_one_plan_message', active: true, newSim: this.planDetails.newSim, plan: this.planDetails } }).subscribe((res) => {
          if(res) this.dialogRef.closeEvent.emit();
        })
      }
    }
    else if(this.transactionId != '' && this.activeForm.value.active == 'manual') {
      this.dialogService.openModal(ImportantComponent, { context: { body: 'installation.manual_activate_plan', transactionId : this.transactionId, active: false, newSim: this.planDetails.newSim, plan: this.planDetails }, cssClass: 'bg-transparent' }).subscribe((res) => {
        if(res) this.dialogRef.closeEvent.emit();
      })
    }
    else if(this.transactionId == ''){
      this.dialogRef.closeEvent.emit();
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
}
