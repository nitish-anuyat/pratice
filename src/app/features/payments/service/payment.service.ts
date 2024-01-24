import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;
  
  constructor( private http : HttpClient) { }

  getPaymentMethods(){
    return this.http.get(`${this.serverUrl}/payment-methods`);
  }
}
