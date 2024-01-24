import { Currency } from "../../models";

export interface CurrencyState {
  defaultCurrency: Currency | undefined,
  currencyList: Array<Currency>,
  subscriberCurrency:  Currency | undefined
}

export const initialState: CurrencyState = {
  defaultCurrency: undefined,
  currencyList: [],
  subscriberCurrency: undefined
};