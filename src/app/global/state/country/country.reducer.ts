import { Action, createReducer, on } from "@ngrx/store";
import * as CountryActions from "./country.actions";
import { initialState, CountryState } from "./country.state";

const userReducer = createReducer(
  initialState,
  on(CountryActions.fetchCountriesSuccess, (state, { list }) => ({
      ...state,
      list: list
    })
  )
);

export function reducer(state: CountryState | undefined, action: Action) {
  return userReducer(state, action);
}