import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  private isBrowser = new BehaviorSubject<boolean>(false);
  private scrollEvent = new BehaviorSubject<any>(undefined);
  constructor() { }

  getIsBrowser(){
    return this.isBrowser.asObservable();
  }

  setIsBrowser(value: boolean){
    this.isBrowser.next(value);
  }

  onScroll(){
    return this.scrollEvent.asObservable();
  }

  setOnScroll(value: any){
    this.scrollEvent.next(value);
  }
}
