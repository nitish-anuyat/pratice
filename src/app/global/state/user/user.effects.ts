import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, map, catchError, switchMap } from "rxjs/operators";
import * as UserActions from "./user.actions";
import * as SubscriptionsActions from "../subscriptions/subscriptions.actions";
import * as CurrencyActions from "../currency/currency.actions";
import * as CountryActions from "../country/country.actions";
import { of } from "rxjs";
import { UserService, ConfigService } from "../../service";

@Injectable()
export class UserEffects {

  configData: any;
  constructor(
    private actions$: Actions<any>,
    private userService: UserService,
    private configService: ConfigService
  ) {
    configService.getLocalConfig().subscribe((result : any) => this.configData = result);
  }

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.allNavbarActions.loginFlowInitiated.type),
        switchMap(() => this.userService.getUserDetails().pipe(
          switchMap((details : any) =>{
            if(typeof(this.configData?.currencyConversionMasterEnabled) == 'boolean' && !this.configData.currencyConversionMasterEnabled){
              return of(
                UserActions.userUpdateSuccess({userDetails: details}),
                SubscriptionsActions.setDataUsageDetails(),
                SubscriptionsActions.setSubscriptionsDetails(),
                CountryActions.appLoaded()
              )
            } else {
              return of(
                UserActions.userUpdateSuccess({userDetails: details}),
                SubscriptionsActions.setDataUsageDetails(),
                SubscriptionsActions.setSubscriptionsDetails(),
                CurrencyActions.fetchCurrencySettings()
              )
            }
          }),
          catchError((error) =>
            of(UserActions.userUpdateFailed({ error: error }))
          )
        ))
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.allNavbarActions.logoutFlowInitiated.type),
        tap(() => this.userService.logout())
      ),
    { dispatch: false }
  );

  updateUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserDetails), // Listen for the updateUserDetails action
      map((action) =>
        UserActions.userUpdateSuccess({ userDetails: action.userDetails })
      )
    )
  );
}
