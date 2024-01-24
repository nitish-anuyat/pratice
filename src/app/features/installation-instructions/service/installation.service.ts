import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getICCID() {
    return this.http.get(`${this.serverUrl}/activation/iccid`);
  }

  // Get Activation Code based on the response of the getICCID() API call
  getActivationCode(): Observable<any> {
    return this.getICCID().pipe(
      mergeMap((firstApiResponse: any) => {
        const iccid = firstApiResponse.iccid;

        return this.http.get(`${this.serverUrl}/activation/activation-code/${iccid}`);
      })
    );
  }

  sendEmailQRCode() {
    return this.http.get(`${this.serverUrl}/sendqrcode`)
  }
}
