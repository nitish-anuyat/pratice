import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import * as CountryActions from "./country.actions";
import * as CurrencyActions from "../currency/currency.actions";
import { ApiService, ConfigService } from "../../service";

@Injectable()
export class CountryEffects {
  
  configData: any;
  constructor(
    private actions$: Actions<any>,
    private apiService: ApiService,
    private configService: ConfigService
  ) {
    configService.getLocalConfig().subscribe((result : any) => this.configData = result);
  }

  fetchCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.appLoaded.type),
      switchMap(() =>
        this.apiService.getCountries().pipe(
          switchMap((items : any) => {
            if(typeof(this.configData?.currencyConversionMasterEnabled) == 'boolean' && !this.configData.currencyConversionMasterEnabled && items?.length > 0){
              const countryWithCurrency = items.find((country : any) => country?.startingCurrency)?.startingCurrency || 'USD';
              return of (CurrencyActions.fetchCurrencySettingsSuccess({ 
                  defaultCurrency: { currency: countryWithCurrency, currency_name: countryWithCurrency, _id: undefined},
                  currencyList: [],
                  subscriberCurrency: { currency: countryWithCurrency, currency_name: countryWithCurrency, _id: undefined}
                }),
                CountryActions.fetchCountriesSuccess({ list: items })
              );
            } else {
              return of(CountryActions.fetchCountriesSuccess({ list: items }));
            }
          }),
          catchError((error) =>
            of(CountryActions.fetchCountriesFailed({ error: error }))
          )
        )
      )
    )
  );
}