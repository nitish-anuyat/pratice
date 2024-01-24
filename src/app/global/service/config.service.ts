import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  serverUrl = environment.serverUrl;
  customerId = environment.customerId;

  configDetails$ = new BehaviorSubject<any>(undefined)
  
  constructor( private http: HttpClient, private localStorageService : LocalStorageService) { }
  
  getConfigFromServer(){
    const configData = JSON.parse(this.localStorageService.getItem('config') || '{}');
    this.http.get(`${this.serverUrl}/customers/setting/configuration?customerId=${ this.customerId}${configData?.cacheId ? '&cacheId='+ configData.cacheId : ''}`).subscribe((result : any) => { 
      if(result?.data?.cacheId){
        this.localStorageService.setItem('config', JSON.stringify(result.data));
        this.configDetails$.next(result.data);
      } else if(configData?.cacheId){
        this.configDetails$.next(configData);
      }
    });
  }

  getLocalConfig(){
    return this.configDetails$.asObservable();
  }

}
