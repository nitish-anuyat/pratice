import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyPlansService {

  serverUrl = environment.serverUrl;
  activeTab$: Subject<any> = new Subject();
  
  constructor(private http: HttpClient) { }

  getMyPlans(status: string) {
    return this.http.get(`${this.serverUrl}/subscriptions?status=${status}`);
  }
  
  getDataUsage() {
    return this.http.get(`${this.serverUrl}/activation/data-usage`);
  }
  
  activateNowUpcomingPlan(plan: any) {
    return this.http.post(`${this.serverUrl}/subscriptions/${plan._id}/subscribe`, {planId: plan.productId });
  }

  getPlansCount() {
    return [
      this.http.get(`${this.serverUrl}/subscriptions?status=active`),
      this.http.get(`${this.serverUrl}/subscriptions?status=upcoming`),
      this.http.get(`${this.serverUrl}/subscriptions?status=expired`)
    ];
  }

  getActiveTab() {
    return this.activeTab$.asObservable();
  }

  setActiveTab(value: string) {
    this.activeTab$.next(value);
  }
}
