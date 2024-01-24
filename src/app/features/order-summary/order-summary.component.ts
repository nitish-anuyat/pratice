import { Component, TransferState, makeStateKey } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Currency } from 'src/app/global/models';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';
import {
  AlertService,
  ConfigService,
  LocalStorageService,
  SubscriptionsService,
  UserService,
} from 'src/app/global/service';
import { selectUserDetails } from 'src/app/global/state/user';
import { PlanService } from '../plans-list/service/plan.service';
import { TranslateService } from '@ngx-translate/core';

const STATE_KEY_PLAN_DETAILS = makeStateKey('plan-details');
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  userDetails$ = this.store.select(selectUserDetails);
  userDetails!: any;
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency: Currency | undefined;
  planDetails: any;
  rewardPointsDetails: any;
  couponDetails: any = {};
  invalidPointsInput = true;
  inProgress = false;
  redeemPoints: FormControl = new FormControl('', [
    Validators.min(1),
  ]);
  couponCode: FormControl = new FormControl('', [
    Validators.minLength(4),
    Validators.maxLength(20),
  ]);
  totalPayableAmount = 0;
  configData: any;

  constructor(
    private store: Store,
    private router: Router,
    private configService: ConfigService,
    private alertService: AlertService,
    private subscriptionsService: SubscriptionsService,
    private planService: PlanService,
    private userService: UserService,
    private state: TransferState,
    private activatedRoute: ActivatedRoute,
    private localStorageService : LocalStorageService,
    private translateService : TranslateService
  ) {
    this.userDetails$.subscribe((details) => (this.userDetails = details));
    this.defaultCurrency$.subscribe((currency: any) => {
      this.defaultCurrency = currency;
    });

    const plan = this.state.get(STATE_KEY_PLAN_DETAILS, <any>'');
    this.activatedRoute.params.subscribe((params: any) => {
      if (plan != '') {
        this.planDetails = JSON.parse(plan);
        this.totalPayableAmount = this.planDetails.price;
      } else {
        this.getPlanDetails({ productId: params.planId });
      }
    });

    configService.getLocalConfig().subscribe((configData: any) => {
      this.configData = configData;
      if (this.configData?.rewardPointsEnabled) {
        this.getRewardPoints();
        this.redeemPoints.addValidators([
          Validators.min(this.configData.rewardPointsMinRedeem),
        ]);
      }
    });
  }

  purchasePlan() {
    if (this.userDetails) {
      this.inProgress = true;
      this.subscriptionsService
        .subscribePlan(
          this.planDetails,
          this.rewardPointsDetails?.rewardPointsToRedeem,
          this.couponDetails?.couponCodeToRedeem
        )
        .catch((err: any) => {
          this.alertService.error(err.error.message, err.status);
          this.inProgress = false;
        });
    } else {
      this.router.navigate(['/auth/signin']);
    }
  }

  getRewardPoints() {
    this.userService.getRewardPointsDetails().subscribe((result: any) => {
      if (result) {
        this.rewardPointsDetails = result;
        const maxRedeem =
          this.configData?.rewardPointsMaxRedeem > result.rewardPoints
            ? result.rewardPoints
            : this.configData?.rewardPointsMaxRedeem;
        if (result.rewardPoints > 0 && maxRedeem > 0)
          this.redeemPoints.addValidators([Validators.max(maxRedeem)]);
      }
    });
  }

  applyDiscount() {
    if (this.redeemPoints.value > 0 || this.couponCode.value.trim() != '') {
      if(this.redeemPoints.value > 0) this.rewardPointsDetails.errorMessage = undefined;
      if(this.couponCode.value.trim() != '') this.couponDetails.errorMessage = undefined;
      this.userService
        .redeemPointsOrCouponValuation(
          this.planDetails.stripeProductId,
          this.redeemPoints.value > 0 ? this.redeemPoints.value : 0,
          this.couponCode.value.trim() != '' ? this.couponCode.value : undefined
        )
        .subscribe(
          (result: any) => {
            if(this.redeemPoints.value > 0){
              if(parseFloat(result.rewardPointsValue) > result.planActualPrice){
                this.rewardPointsDetails.errorMessage = this.translateService.instant('order_summary.reward_points.reward_usage_limit_error');
                this.rewardPointsDetails.isValid = false;
              }else {
                this.rewardPointsDetails = {
                  ...this.rewardPointsDetails,
                  ...result,
                  cashValueOfPoints: parseFloat(result.rewardPointsValue),
                };
                this.rewardPointsDetails.isValid = true;
                this.totalPayableAmount = result.finalPayableAmount;
                this.rewardPointsDetails.updatedRewardPoints = this.rewardPointsDetails.rewardPoints - result.rewardPointsToRedeem;
                this.rewardPointsDetails.updatedCashValue = this.rewardPointsDetails.cashValue - result.rewardPointsValue;
              }
              
            }
            
            if(this.couponCode.value.trim() != ''){
              this.couponDetails = {
                ...this.couponDetails,
                ...result
              };
              this.couponDetails.isValid = true;
              this.totalPayableAmount = result.finalPayableAmount;
            }
          },
          (err) => {
            if(err?.error?.rewardPointsError){
              this.rewardPointsDetails.errorMessage = err?.error?.rewardPointsError || this.translateService.instant('order_summary.invalid_reward_points');
              this.rewardPointsDetails.isValid = false;
            }
            if(err?.error?.couponCodeError){
              this.couponDetails.errorMessage = err?.error?.couponCodeError || this.translateService.instant('order_summary.invalid_coupon_error');
              this.couponDetails.isValid = false;
            }
          }
        );
    }
  }

  getPlanDetails(plan: any) {
    this.inProgress = true;
    this.planService.getPlanDetails(plan).subscribe(
      (result: any) => {
        if (result?.length > 0) {
          this.planDetails = result[0];
          this.planDetails.country = this.planDetails.country ? this.planDetails.country : this.localStorageService.getItem("planCountry");
          this.totalPayableAmount = this.planDetails.price;
        }
        this.inProgress = false;
      },
      () => {
        this.inProgress = false;
      }
    );
  }

  resetDiscountDetails(isForReward : boolean){
    if(isForReward){
      this.totalPayableAmount = this.rewardPointsDetails?.planActualPrice || this.totalPayableAmount;
      this.rewardPointsDetails.updatedRewardPoints = this.rewardPointsDetails.rewardPoints;
      this.rewardPointsDetails.updatedCashValue = this.rewardPointsDetails.cashValue;
      this.rewardPointsDetails.errorMessage = undefined;
      this.rewardPointsDetails.rewardPointsToRedeem = undefined;
      this.rewardPointsDetails.isValid = false;
    } else {
      this.totalPayableAmount = this.couponDetails?.planActualPrice || this.totalPayableAmount;
      this.couponDetails.errorMessage = undefined;
      this.couponDetails.isValid = false;
      this.couponDetails.couponCodeToRedeem = undefined;
      this.couponDetails.couponCodeValue = undefined;
    }
  }
}