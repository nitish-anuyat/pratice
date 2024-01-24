import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '.';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = environment.serverUrl;
  customerId = environment.customerId;

  defaultCurrency: string | undefined = '';
  constructor(private http: HttpClient, private _localStorageService: LocalStorageService) { }

  getCountries() {
    return this.http.get(`${this.serverUrl}/countries?customerId=${this.customerId}${(this.defaultCurrency && this.defaultCurrency != '') ?  '&currency=' + this.defaultCurrency : ''}`);
  }
  
  getFAQs() {
    return this.http.get(`${this.serverUrl}/faqs`);
  }

  getCurrencySettings(){
    let routeUrl = '';
    if(this._localStorageService.getToken()){
      routeUrl = `settings/currency`;
    } else {
      routeUrl = `subscribers/settings/currency?customerId=${this.customerId}`;
    }
    return this.http.get(`${this.serverUrl}/${routeUrl}`);
  }
}
