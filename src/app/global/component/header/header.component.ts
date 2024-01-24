import { Component } from '@angular/core';
import { allNavbarActions, selectUserDetails } from '../../state/user';
import { Store } from '@ngrx/store';
import { BrowserService, LocalStorageService } from '../../service';
import { fetchCurrencySettings } from '../../state/currency';
import { ConfigService } from '../../service/config.service';
import { appLoaded } from '../../state/country';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userDetails$ = this.store.select(selectUserDetails);
  
  userDetails: any;
  configData: any;
  isBrowser  = false;
  constructor( private store: Store, private localStorageService : LocalStorageService, private browserService : BrowserService, private configService: ConfigService){
    this.userDetails$.subscribe(details => this.userDetails = details );
    configService.getLocalConfig().subscribe((configData : any) => {
      this.configData = configData;
      const token = this.localStorageService.getToken();
      if(token && !this.userDetails){
        this.store.dispatch(allNavbarActions.loginFlowInitiated());
      } else if(typeof(this.configData?.currencyConversionMasterEnabled) == 'boolean' && !this.configData.currencyConversionMasterEnabled){
        this.store.dispatch(appLoaded());
      } else {
        this.store.dispatch(fetchCurrencySettings());
      }
      if(typeof(this.configData?.rewardPointsEnabled) == 'boolean' && !this.configData.rewardPointsEnabled){
        this.navigationData = this.navigationList.filter((navItem : any) => navItem.name != 'My Reward Points');
      }
    });
    
    browserService.getIsBrowser().subscribe((isBrowser) => this.isBrowser = isBrowser);
  }

  navigationList : Array<any> = [
    { name: 'header.home', routeLink: '/', forUser: false, cssClass:'d-block d-xl-none'},
    { name: 'header.view_plans', routeLink: '/choose-destination', forUser: false, cssClass:'d-block d-xl-none'},
    { name: 'header.my_plans', routeLink: '/my-plans', forUser: true, cssClass:'d-block d-xl-none'},
    { name: 'header.faq', routeLink: '/FAQ', forUser: false, cssClass:'d-block d-xl-none'},
    { name: 'header.help', routeLink: '/contact-us', forUser: false, cssClass:'d-block d-xl-none'},
    { name: 'header.settings', routeLink: '/settings', forUser: false, cssClass:'d-block d-xl-none'},
    { name: 'header.my_reward_points', routeLink: '/rewards', forUser: true, cssClass:'d-block'},
    { name: 'header.privacy_policy', routeLink: '/privacy-policy', forUser: false, cssClass:'d-block'},
    { name: 'header.terms&header.conditions', routeLink: '/terms-and-conditions', forUser: false, cssClass:'d-block'},
  ];
  navigationData : Array<any> = this.navigationList;
  
  logout() {
    this.store.dispatch(allNavbarActions.logoutFlowInitiated());
    if(this.isBrowser){
      window.location.href = "/auth/signin"
    }
  }
}
