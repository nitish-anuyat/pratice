import { getCurrencySymbol } from '@angular/common';
import { Component, OnDestroy, OnInit, TransferState, ViewContainerRef, makeStateKey } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Currency } from 'src/app/global/models';
import { AlertService, BrowserService, DialogComponent, LocalStorageService, SubscriptionsService } from 'src/app/global/service';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';
import { PlanService } from '../../service/plan.service';
import { selectUserDetails } from 'src/app/global/state/user';
import { Subject, takeUntil } from 'rxjs';

const STATE_KEY_PLAN_DETAILS = makeStateKey('plan-details');
@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss']
})
export class PlanDetailsComponent implements OnInit, OnDestroy{
  
  planDetail: any;
  isFromExpired = false;
  dialogRef: any;
  currencySymbol = '';
  inProgress = false;
  
  userDetails$ = this.store.select(selectUserDetails);
  userDetails: any;
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;
  isBrowser  = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private viewContainer: ViewContainerRef,
    private subscriptionsService : SubscriptionsService,
    private store : Store,
    private router : Router,
    private alertService : AlertService,
    private planService : PlanService,
    private state : TransferState,
    private browserService : BrowserService,
    private localStorageService : LocalStorageService
  ) {
    const _injector = this.viewContainer.injector;
    this.dialogRef = _injector.get<DialogComponent>(DialogComponent);
    browserService.getIsBrowser().subscribe((isBrowser : boolean) => this.isBrowser = isBrowser);
    this.userDetails$.subscribe(details => this.userDetails = details );
  }

  ngOnInit(): void {
    this.userDetails$.subscribe(details => this.userDetails = details );
    this.defaultCurrency$.pipe(takeUntil(this.destroy$)).subscribe((currency: any) => { 
      if(currency){
        this.defaultCurrency = currency;
        this.currencySymbol = getCurrencySymbol(currency.currency, 'wide'); 
      }
    });
    
    if(this.isFromExpired){
      this.inProgress = true;
      this.planService.getPlanDetails(this.planDetail).subscribe((result : any) =>{
        if(result?.length > 0 && result[0].priceBundle){
          this.planDetail.price = result[0].price;
          this.planDetail.priceBundle = result[0].priceBundle;
        }
        this.inProgress = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    if(this.destroy$?.complete) this.destroy$.complete();
    if(this.destroy$?.unsubscribe) this.destroy$.unsubscribe();
  }

  buyPlan(plan : any){
    this.dialogRef.closeEvent.emit();
    if(this.userDetails){
      this.state.set(STATE_KEY_PLAN_DETAILS, <any>JSON.stringify(plan));
      this.localStorageService.setItem("planCountry", plan.country);
      this.router.navigate(["/order-summary", plan.productId]);
    } else {
      this.dialogRef.closeEvent.emit();
      if(this.isBrowser){
        const storeObject = { 
          id: plan.productId,
          route: decodeURIComponent(this.router.url),
          scrollPosition: window.document.getElementById('mainScrollContainer')?.scrollTop
        };
        this.localStorageService.setItem("planDetails", JSON.stringify(storeObject));
      }
      this.router.navigate(["/auth/signin"]);
    } 
  }

  close(){
    this.dialogRef.closeEvent.emit();
  }
}
