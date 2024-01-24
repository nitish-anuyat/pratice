import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { BrowserService } from 'src/app/global/service';

@Component({
  selector: 'app-expired-plan',
  templateUrl: './expired-plan.component.html',
  styleUrls: ['./expired-plan.component.scss']
})
export class ExpiredPlanComponent implements OnInit{

  @Input() planDetails : any;
  @Input() isForModal  = false;
  @Output() triggerEvent : EventEmitter<any> = new EventEmitter();
  
  totalData = 20;
  usedData = 0;
  usedDataForGuage = 0;
  isBrowser  = false;

  constructor( @Inject(PLATFORM_ID) private platformId: any, private browserService: BrowserService ) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    const parsedData = parseInt(this.planDetails?.data?.replace(/[^0-9]/g, '') || 0);
    this.totalData = this.planDetails.data.includes("GB") ? 1024 * parsedData : parsedData;
  }
}
