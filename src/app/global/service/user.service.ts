import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {} from '../state/user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;
  private transactionHistory : BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  getUserDetails() {
    return this.http.get(`${this.serverUrl}/subscribers/me`);
  }

  logout() {
    this.localStorageService.removeToken();
  }

  updateProfile(userData: any) {
    return this.http.put(`${this.serverUrl}/subscribers`, userData);
  }

  changePassword(userData: any) {
    return this.http.put(
      `${this.serverUrl}/subscribers/changePassword`,
      userData
    );
  }

  updateCurrency(currencyData: any) {
    return this.http.put(
      `${this.serverUrl}/subscribers/settings/currency`,
      currencyData
    );
  }

  getRewardPointsDetails() {
    return this.http.get(`${this.serverUrl}/subscriber/rewardPoints`);
  }

  redeemPointsOrCouponValuation(stripeProductId: string, redeemPoints: number, couponCode?: string) {
    let rewardPointObj;

    if (redeemPoints > 0) {
      rewardPointObj = {
        redeemPoints: redeemPoints,
        rewardPointsApplied: true,
      };
    }
    if(couponCode && couponCode.trim() != ''){
      rewardPointObj = {...rewardPointObj, coupon : couponCode, couponCodeApplied : true };
    }
    return this.http.post(
      `${this.serverUrl}/redeem-points-coupon/${stripeProductId}`,
      rewardPointObj
    );
  }

  setTransactionHistory(transactions : Array<any>){
    this.transactionHistory.next(transactions);
  }

  getTransactionsHistory(fromLocal : boolean = false) {
    if(fromLocal){
      return this.transactionHistory.asObservable();
    } else {
      return this.http.get(`${this.serverUrl}/loyalty-transactions`);
    }
  }
}
