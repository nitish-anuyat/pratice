import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Currency } from '../../models';
import { currencySettings } from '../../state/currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  currencySettings$ = this.store.select(currencySettings);
  defaultCurrency!: Currency;
  constructor( private store: Store){
    this.currencySettings$.subscribe((settings : any) => {
      if(settings?.defaultCurrency){
        this.defaultCurrency = settings.subscriberCurrency ? undefined : settings.defaultCurrency;
      }
    });
  }
}
