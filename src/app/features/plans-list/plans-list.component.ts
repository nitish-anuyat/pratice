import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from './service/plan.service';
import { getCurrencySymbol } from '@angular/common';
import { AlertService, DialogService, LocalStorageService, SubscriptionsService } from 'src/app/global/service';
import { PlanDetailsComponent } from './component/plan-details/plan-details.component';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/global/state/user';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';
import { Currency } from 'src/app/global/models';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss']
})
export class PlansListComponent implements OnInit, OnDestroy{

  pageTitle = '';
  pageSubDetails = '';
  previousRoute = '/';
  currencySymbol = '';
  plansList: Array<any> = [];
  inProgress = true;
  userDetails$ = this.store.select(selectUserDetails);
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;
  userDetails: any;
  countryName  = ''
  selectedPlanDetails : any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private plansService: PlanService,
    private dialogService: DialogService,
    private subscriptionsService : SubscriptionsService,
    private alertService: AlertService,
    private router : Router,
    private store : Store,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ){
    this.activatedRoute.params.subscribe(params => {
      this.countryName = params['countryName'];
      if(params['countryName'] == 'trending'){
        this.pageTitle = this.translateService.instant('plans.trending_title');
        this.pageSubDetails = this.translateService.instant('plans.trending_sub_details');
        // this.getTrendingPlan();
      } else {
        this.pageTitle = this.translateService.instant(`plans.title`, {countryName: params['countryName']});
        this.pageSubDetails = this.translateService.instant('plans.plans_sub_details', {countryName: params['countryName']});
        this.previousRoute = '/choose-destination'
        // this.getPlansList(params['countryName']);
      }
    });
    this.defaultCurrency$.pipe(takeUntil(this.destroy$)).subscribe((currency: any) => {
      if( currency ){
        this.defaultCurrency = currency;
        this.currencySymbol = getCurrencySymbol(currency.currency, 'wide'); 
        if(this.countryName == 'trending'){
          this.getTrendingPlan();
        } else {
          this.getPlansList(this.countryName);
        }
      }
    });
  }

  ngOnInit(): void {
    this.userDetails$.subscribe(details => this.userDetails = details );
    this.selectedPlanDetails = JSON.parse(this.localStorageService.getItem('planDetails') || '{}');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    if(this.destroy$?.complete) this.destroy$.complete();
    if(this.destroy$?.unsubscribe) this.destroy$.unsubscribe();
  }
  
  getPlansList(countryName : string){
    this.inProgress = true;
    const details = {
      isCountry: true,
      countrySelected: countryName,
      isZone: false,
      zoneSelected: '',
      currency: this.defaultCurrency.currency
    };
    this.plansService.getPlansList(details).subscribe(
      (res : any) => {
        this.plansList = res;
        if(this.selectedPlanDetails?.id){
          const planDetail = this.plansList.find((plan : any) => plan.productId == this.selectedPlanDetails.id);
          if(planDetail) { 
            this.localStorageService.removeItem('planDetails');
            this.selectedPlanDetails = undefined;
            this.showPlanDetails(planDetail); 
          }
        }
        this.inProgress = false;
      }, 
      error => {
        this.inProgress = false;
        this.alertService.error(error.error.message)
      })
  }

  getTrendingPlan(){
    this.inProgress = true;
    this.plansService.getTrendingPlanList(this.defaultCurrency.currency).subscribe(
      ( result : any) => {
        this.plansList = result;
        if(this.selectedPlanDetails?.id){
          const planDetail = this.plansList.find((plan : any) => plan.productId == this.selectedPlanDetails.id);
          if(planDetail) { 
            this.localStorageService.removeItem('planDetails');
            this.selectedPlanDetails = undefined;
            this.showPlanDetails(planDetail); 
          }
        }
        this.inProgress = false;
      },
      () => {
        this.inProgress = false;
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
