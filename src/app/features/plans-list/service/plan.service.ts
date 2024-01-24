import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class PlanService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;

  constructor(private http: HttpClient) { }

  getPlansList(details : any){
    details = {...details, customerId: this.customerId };
    return this.http.get(`${this.serverUrl}/plans`, {params: details});
  }

  getTrendingPlanList(currency : string){
    return this.http.get(`${this.serverUrl}/webTrending` , {params: {customerId: this.customerId, currency: currency}});
  }

  getPlanDetails(details : any){
    return this.http.get(`${this.serverUrl}/plans/${details.productId}`);
  }
}