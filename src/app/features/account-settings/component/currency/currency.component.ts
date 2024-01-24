import { Component } from '@angular/core';
import { AlertService } from 'src/app/global/service';
import { UserService } from 'src/app/global/service/user.service';
import { getCurrencySymbol } from '@angular/common';
import { currencySettings, updateCurrency } from 'src/app/global/state/currency';
import { Currency } from 'src/app/global/models';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/global/state/user';
import { ApiService } from 'src/app/global/service/api.service';
import { appLoaded } from 'src/app/global/state/country';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  countries: Array<Currency> = [];

  selectedCurrency: Currency | undefined;
  defaultCurrency: Currency | undefined;
  searchInput = '';
  userDetails: any;
  userDetails$ = this.store.select(selectUserDetails);
  currencySettings$ = this.store.select(currencySettings);

  constructor(private userService : UserService, private alertService : AlertService, private store: Store, private apiService : ApiService, private translateService: TranslateService){
    this.currencySettings$.subscribe(details =>{ 
      if(details?.defaultCurrency){
        this.countries = details.currencyList; 
        this.defaultCurrency = (details.subscriberCurrency || details.defaultCurrency);
        this.selectedCurrency = (details.subscriberCurrency || details.defaultCurrency);
      }
    });
    this.userDetails$.subscribe(details => this.userDetails = details );
  }


  applyCurrency(){
    if( this.userDetails ) {
      this.userService.updateCurrency(this.selectedCurrency).subscribe(
        () => {
          this.afterUpdateSuccess();
        },
        (err: any) => {
          console.log('err :', err);
        }
      )
    } else {
      this.afterUpdateSuccess();
    }
  }

  afterUpdateSuccess(){
    this.store.dispatch(updateCurrency({ subscriberCurrency: this.selectedCurrency }));
    this.alertService.success(this.translateService.instant('alert.currency_update_success', { currency: `${this.selectedCurrency?.currency_name} ${getCurrencySymbol(this.selectedCurrency?.currency || '', 'wide')}` }) );
    this.defaultCurrency = this.selectedCurrency;
    this.apiService.defaultCurrency = this.defaultCurrency?.currency;
    this.store.dispatch(appLoaded());
  }
}
