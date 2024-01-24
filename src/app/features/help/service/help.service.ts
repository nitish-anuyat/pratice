import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any',
})
export class HelpService {

  serverUrl = environment.serverUrl;
  customerId = environment.customerId;

  constructor(private http: HttpClient) { }

  createRequest(userData: any) {
    return this.http.post(`${this.serverUrl}/create-request`, userData);
  }

  supportRequest(userData: any) {
    return this.http.post(`${this.serverUrl}/support-request`, userData);
  }
}
