import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  serverUrl = environment.serverUrl;
  customerId = environment.customerId;

  constructor(private http: HttpClient) { }

  getDataUsage(){
    return this.http.get<any>(`${this.serverUrl}/activation/data-usage`);
  }

  getSubscriptions(){
    return this.http.get<any>(`${this.serverUrl}/subscriptions`);
  }
}
