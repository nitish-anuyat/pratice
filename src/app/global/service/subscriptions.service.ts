import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowserService } from './browser.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'any',
})
export class SubscriptionsService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;
  isBrowser = false;

  constructor(
    private http: HttpClient,
    private browserService: BrowserService,
    private router: Router
  ) {
    browserService
      .getIsBrowser()
      .subscribe((isBrowser: any) => (this.isBrowser = isBrowser));
  }

  subscribePlan(plan: any, rewardPoint: number | undefined, couponCode: string | undefined) {
    return new Promise((resolve, reject) => {
      const requestBody: any = { country: plan.country };
      if(rewardPoint) requestBody.redeemPoints = rewardPoint;
      if(couponCode) requestBody.coupon = couponCode;

      this.http
        .post(
          `${this.serverUrl}/subscriptions/checkout/${plan.stripeProductId}`,
          requestBody
        )
        .subscribe(
          (res: any) => {
            if (this.isBrowser && res?.url?.trim() != '') {
              window.location.href = res.url;
            }
            resolve(true);
          },
          (err: any) => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  addUpcomingPlanForSubscription(planData: any) {
    return this.http.post(`${this.serverUrl}/subscriptions`, {
      stripeProductId: planData.stripeProductId,
      country: planData.country,
      transactionId: planData.transactionId,
    });
  }
}
