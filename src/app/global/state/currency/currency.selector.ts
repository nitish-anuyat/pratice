import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CurrencyState } from "./currency.state";

export const currencySettings = createFeatureSelector<CurrencyState>("currency");

export const fetchDefaultCurrency = createSelector(
  currencySettings,
  (state: CurrencyState) => state.subscriberCurrency || state.defaultCurrency
);

export const fetchCurrencyList = createSelector(
  currencySettings,
  (state: CurrencyState) => state.currencyList
);