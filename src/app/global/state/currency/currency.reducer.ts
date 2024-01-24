import { Action, createReducer, on } from "@ngrx/store";
import * as CurrencyActions from "./currency.actions";
import { initialState, CurrencyState } from "./currency.state";

const userReducer = createReducer(
  initialState,
  on(CurrencyActions.fetchCurrencySettingsSuccess, (state, settings) => ({
      ...state,
      ...settings
    })
  ),
  on(CurrencyActions.updateCurrencySuccess, (state, {subscriberCurrency}) => ({
    ...state,
    subscriberCurrency : subscriberCurrency
  }))
);

export function reducer(state: CurrencyState | undefined, action: Action) {
  return userReducer(state, action);
}