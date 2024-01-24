import { getCurrencySymbol } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { PlanDetailsComponent } from 'src/app/features/plans-list/component/plan-details/plan-details.component';
import { PlanService } from 'src/app/features/plans-list/service/plan.service';
import { Currency } from 'src/app/global/models';
import { AlertService, DialogService, LocalStorageService, SubscriptionsService } from 'src/app/global/service';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';
import { selectUserDetails } from 'src/app/global/state/user';

@Component({
  selector: 'app-trending-plan',
  templateUrl: './trending-plan.component.html',
  styleUrls: ['./trending-plan.component.scss']
})
export class TrendingPlanComponent implements OnInit, OnDestroy{
  
  constructor( 
    private planService : PlanService,
    private dialogService : DialogService, 
    private subscriptionsService : SubscriptionsService, 
    private store : Store,
    private router : Router,
    private alertService : AlertService,
    private localStorageService : LocalStorageService
  ){}
  
  trendingPlans: Array<any> = [];
  currencySymbol = '';
  inProgress = false;

  userDetails$ = this.store.select(selectUserDetails);
  userDetails: any;
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;
  selectedPlanDetails: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(details => this.userDetails = details );
    this.defaultCurrency$.pipe(takeUntil(this.destroy$)).subscribe((currency: any) => {
      if( currency ){
        this.defaultCurrency = currency;
        this.currencySymbol = getCurrencySymbol(currency.currency, 'wide');
        this.getTrendingPlan();
      }
    });
    this.selectedPlanDetails = JSON.parse(this.localStorageService.getItem('planDetails') || '{}');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    if(this.destroy$?.complete) this.destroy$.complete();
    if(this.destroy$?.unsubscribe) this.destroy$.unsubscribe();
  }

  getTrendingPlan(){
    this.planService.getTrendingPlanList(this.defaultCurrency.currency).subscribe(
      ( result : any) => {
        this.trendingPlans = result;
        if(this.selectedPlanDetails?.id){
          const planDetail = this.trendingPlans.find((plan : any) => plan.productId == this.selectedPlanDetails.id);
          if(planDetail) { 
            this.localStorageService.removeItem('planDetails');
            this.selectedPlanDetails = undefined;
            this.showPlanDetails(planDetail); 
          }
        }
      }
    )
  }

  trackPlan(index: any, item : any) {
    return item._id;
  }

  showPlanDetails(planDetails : any){
    this.dialogService.openModal(PlanDetailsComponent, { context: {planDetail: planDetails}, cssClass: 'modal-vw-40' });
  }

  buyPlan(plan : any){
    if(this.userDetails){
      this.inProgress = true;
      this.subscriptionsService.subscribePlan(plan, undefined, undefined).catch((err : any)=>{
        this.alertService.error(err.error.message, err.status);
        this.inProgress = false;
      });
    } else {
      this.router.navigate(["/auth/signin"]);
    }
  }
}
