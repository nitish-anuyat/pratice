import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;

  constructor(private http: HttpClient) { }

  signin(userData: any) {
    return this.http.post(`${this.serverUrl}/subscribers/signin`, userData);
  }

  signup(userData: any) {
    return this.http.post(`${this.serverUrl}/subscribers/signup`, userData);
  }

  verifyOTP(userData: any) {
    return this.http.get(`${this.serverUrl}/subscribers/verify/${userData.otp}/${userData.email}`);
  }

  forgotPassword(userData : any) {
    return this.http.post(`${this.serverUrl}/subscribers/forgot`, {...userData, customerId: this.customerId});
  }

  validateOTP(userData : any){
    return this.http.get(`${this.serverUrl}/subscribers/reset/${userData.otp}/${userData.email}`);
  }

  resendOTP(userData : any){
    return this.http.post(`${this.serverUrl}/subscribers/resendOTP`, {...userData, customerId: this.customerId});
  }

  resetPassword(userData : any){
    return this.http.post(`${this.serverUrl}/subscribers/reset`, userData);
  }

  getCountries() {
    return this.http.get(`${this.serverUrl}/countries?customerId=${this.customerId}`);
  }
}
