import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import * as CurrencyActions from "./currency.actions";
import * as CountryActions from "../country/country.actions"
import { ApiService } from "../../service/api.service";

@Injectable()
export class CurrencyEffects {
  constructor(
    private actions$: Actions<any>,
    private apiService: ApiService
  ) {}

  fetchCurrencySettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.fetchCurrencySettings.type),
      switchMap(() =>
        this.apiService.getCurrencySettings().pipe(
          switchMap((items : any) =>{
            this.apiService.defaultCurrency = items?.subscriberCurrency ? (items?.subscriberCurrency?.currency || '') : (items?.defaultCurrency?.currency || '');
            return of(
              CountryActions.appLoaded(),
              CurrencyActions.fetchCurrencySettingsSuccess(items)
            );
          }
          ),
          catchError((error) =>
            of(CurrencyActions.fetchCurrencySettingsFailed({ error: error }))
          )
        )
      )
    )
  );

  updateSubscriberCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.updateCurrency),
      map((action) =>
        CurrencyActions.updateCurrencySuccess({ subscriberCurrency: action.subscriberCurrency })
      ),
      catchError((error) =>
        of(CurrencyActions.updateCurrencyFailed({ error: error }))
      )
    )
  )
}