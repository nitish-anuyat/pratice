import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AlertService, DialogComponent, DialogService } from '../../service';
import { Router } from '@angular/router';
import { MyPlansService } from 'src/app/features/my-plans/service/my-plans.service';
import { Store } from '@ngrx/store';
import { setDataUsageSuccess, setSubscriptionStatus } from '../../state/subscriptions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent implements OnInit{
  planDetail: any;
  dialogRef: any;
  currencySymbol = '';
  description = '';
  nextDialog = false;
  active = false;
  newSim: boolean = false; 
  plan: any;
  inProgress = false;
  upcomingActivate!: boolean;

  constructor(private viewContainer: ViewContainerRef, 
              private dialogService: DialogService, 
              private router: Router,
              private myplanService: MyPlansService,
              private alertService: AlertService,
              private store: Store,
              private translateService: TranslateService) {
    const _injector = this.viewContainer.injector;
    this.dialogRef = _injector.get<DialogComponent>(DialogComponent);
  }

  ngOnInit(): void {
    this.description = this.dialogRef.context.body;
    this.nextDialog = this.dialogRef.context.nextDialog;
    this.active = this.dialogRef.context.active;
    this.newSim = this.dialogRef.context.newSim || false;
    this.plan = this.dialogRef.context.plan ?? this.dialogRef.context.upcomingPlan;
    this.upcomingActivate = this.dialogRef.context.upcomingActivate;
    console.log(this.router.url)
  }

  continue() {
    if(!this.nextDialog) 
    {
      if((!this.newSim && this.router.url.includes('payment-status') && this.active) || this.upcomingActivate) {
        this.inProgress = true;
        this.myplanService.activateNowUpcomingPlan(this.plan).subscribe((response: any) => { 
          if(response) {
            this.inProgress = false;
            this.store.dispatch(setSubscriptionStatus({...this.plan, status: 'active', expiryDate: response.expiryDate, totalData: response.data }) );
            this.store.dispatch(setDataUsageSuccess({ dataUsage : {total_data_size_in_MB: response.data, used_data_size_in_MB: 0, remaining_data_in_MB: response.data}}));
            this.dialogRef.closeEvent.emit(true);
            if(this.upcomingActivate){
              this.alertService.success(`${this.translateService.instant('alert.plan_active_success', { planName: this.plan.name, planData: this.plan.data, planValidity: this.plan.validity})} ${(this.plan.validity > 1 ? this.translateService.instant('plans.days') : this.translateService.instant('plans.days') )}`,
               'Success', this.translateService.instant('alert.plan_active_success_title'))
            } else {
              this.alertService.success(response.message)
            }
            if(this.upcomingActivate) {
              this.router.navigate(['/my-plans/active']) 
            }
            else this.router.navigate(['/']);
          }
        }, 
        error => {
          this.inProgress = false;
          this.alertService.error(error.error.message)
        })
      } 
      else if(!this.newSim && this.router.url.includes('payment-status') && !this.active) { 
        this.dialogRef.closeEvent.emit(true);
        this.router.navigate(['/my-plans/upcoming'], { replaceUrl: true });
      } 
      else {
        this.dialogRef.closeEvent.emit();
        this.dialogService.openModal(ImportantComponent, { context: { body: 'installation.activate_one_plan_message', nextDialog: true, upcomingPlan: this.plan } })
      }
    } else {
      this.myplanService.activateNowUpcomingPlan(this.plan).subscribe((response: any) => { 
        if(response) {
          this.inProgress = false;
          this.store.dispatch(setSubscriptionStatus({...this.plan, status: 'active', expiryDate: response.expiryDate, totalData: response.data }) );
          this.store.dispatch(setDataUsageSuccess({ dataUsage : {total_data_size_in_MB: response.data, used_data_size_in_MB: 0, remaining_data_in_MB: response.data}}));
          this.dialogRef.closeEvent.emit();
          this.alertService.success(`${this.translateService.instant('alert.plan_active_success', { planName: this.plan.name, planData: this.plan.data, planValidity: this.plan.validity})} ${(this.plan.validity > 1 ? this.translateService.instant('plans.days') : this.translateService.instant('plans.days') )}`,
               'Success', this.translateService.instant('alert.plan_active_success_title'))
          this.router.navigate(['/']);
        }
      }, 
      error => {
        this.inProgress = false;
        this.dialogRef.closeEvent.emit();
        if(error.error.message.includes('already activated')) this.alertService.error(error.error.message, 401);
        else this.alertService.error(error.error.message);
      })
    }
  }

  goToHome() {
    if(this.nextDialog) {
      this.dialogRef.closeEvent.emit()
      this.dialogService.openModal(ImportantComponent, { context: { body : 'installation.manual_activate_plan', active: false} })
    } else {
      this.dialogRef.closeEvent.emit();
      // this.router.navigate(['/'])
    }
  }
  
  redirectToInstallation(){
    this.dialogRef.closeEvent.emit();
    this.router.navigate(['/installation'])
  }

  close(){
    this.dialogRef.closeEvent.emit();
  }
}
