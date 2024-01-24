import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BrowserService } from './global/service';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService } from './global/service/config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'esim-management-portal-application-web-app';
  isBrowser  = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private browserService: BrowserService, private configService: ConfigService, private translateService: TranslateService) {
    this.isBrowser = isPlatformBrowser(platformId);
    browserService.setIsBrowser(this.isBrowser);
  }
  
  ngOnInit(): void {
    this.configService.getConfigFromServer();
    this.translateService.addLangs(['en']);
    this.translateService.setDefaultLang('en');
  }
  
}
