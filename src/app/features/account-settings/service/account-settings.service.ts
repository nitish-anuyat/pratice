import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;
  
  constructor(private http: HttpClient) { }


}
