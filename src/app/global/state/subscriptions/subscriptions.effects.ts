import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import * as SubscriptionsActions from "./subscriptions.actions";
import { of } from "rxjs";
import { ActivationService } from "../../service/activation.service";

@Injectable()
export class ActivationEffects {
  constructor(
    private actions$: Actions<any>,
    private activationService: ActivationService
  ) {}

  setDataUsage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubscriptionsActions.setDataUsageDetails.type),
        switchMap(() => this.activationService.getDataUsage().pipe(
            map((details : any) => 
              SubscriptionsActions.setDataUsageSuccess({ dataUsage: details })
            ),
            catchError((error) =>
              of(SubscriptionsActions.setDataUsageFailed({ error: error }))
            )
        ))
      )
  );

  setSubscriptions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubscriptionsActions.setSubscriptionsDetails.type),
        switchMap(() => this.activationService.getSubscriptions().pipe(
            map((details : any) => 
              SubscriptionsActions.setSubscriptionsSuccess({ subscriptions: details })
            ),
            catchError((error) =>
              of(SubscriptionsActions.setSubscriptionsFailed({ error: error }))
            )
        ))
      )
  );
  
  setSubscriptionStatus$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(SubscriptionsActions.setSubscriptionStatus),
        map((action) =>
          SubscriptionsActions.setSubscriptionStatusSuccess(action)
        ),
        catchError((error) =>
          of(SubscriptionsActions.setSubscriptionStatusFailed({ error: error }))
        )
      )
  )

  addSubscription$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(SubscriptionsActions.addSubscription),
        map((action) =>{
          return SubscriptionsActions.addSubscriptionSuccess(action)
        }),
        catchError((error) =>
          of(SubscriptionsActions.addSubscriptionFailed({ error: error }))
        )
      )
  )
}