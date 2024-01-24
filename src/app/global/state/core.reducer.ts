import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as UserReducer from "./user/user.reducer";
import * as CountryReducer from "./country/country.reducer";
import * as SubscriptionReducer from "./subscriptions/subscriptions.reducer";
import * as CurrencyReducer from "./currency/currency.reducer";
import * as UserActions from "./user/user.actions";

export const reducers: ActionReducerMap<State> = {
  user: UserReducer.reducer,
  country: CountryReducer.reducer,
  subscription : SubscriptionReducer.reducer,
  currency: CurrencyReducer.reducer
};

export function clearOnLogoutMetaReducer(reducer : any): any {
  return (state : any, action: any) => {
    if ( action != null && action.type === UserActions.allNavbarActions.logoutFlowInitiated.type) {
      return reducer( {
        user : UserReducer.reducer,
        country : state.country,
        subscription : SubscriptionReducer.reducer,
        currency: CurrencyReducer.reducer
      }, action);
    } else if ( action != null && action.type === UserActions.allNavbarActions.loginFlowInitiated.type) {
      return reducer( {
        user : UserReducer.reducer,
        country : CountryReducer.reducer,
        subscription : SubscriptionReducer.reducer,
        currency: CurrencyReducer.reducer
      }, action);
    }
    return reducer(state, action);
  };
} 

export const metaReducers: MetaReducer<State>[] = [ clearOnLogoutMetaReducer ];