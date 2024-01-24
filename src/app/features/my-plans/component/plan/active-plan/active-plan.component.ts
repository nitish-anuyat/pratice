import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrowserService } from 'src/app/global/service';
import { selectDataUsage } from 'src/app/global/state/subscriptions';

@Component({
  selector: 'app-active-plan',
  templateUrl: './active-plan.component.html',
  styleUrls: ['./active-plan.component.scss']
})
export class ActivePlanComponent {

  @Input() planDetails : any;
  @Input() isForModal  = false;
  @Output() triggerEvent : EventEmitter<any> = new EventEmitter();

  isBrowser = false;
  inProgress = false;
  totalData!: number;
  usedData!: number;
  usedDataForGuage!: number;
  dataUsage$ = this.store.select(selectDataUsage);
  dataUsage: any = undefined;

  constructor( @Inject(PLATFORM_ID) private platformId: any, private browserService: BrowserService, private store: Store ) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(isPlatformBrowser(platformId));
    this.getDataUsage();
  }

  getDataUsage() {
    this.dataUsage$.subscribe(details => {
      this.inProgress = true;
      this.dataUsage = details;
      this.totalData = this.dataUsage?.total_data_size_in_MB
      this.usedData = this.dataUsage?.used_data_size_in_MB
      this.usedDataForGuage = this.dataUsage?.remaining_data_in_MB ? 
      Number(((this.usedData/this.totalData) * 100).toFixed(2)) : 0;
        this.inProgress = false;
    });
  }
}
