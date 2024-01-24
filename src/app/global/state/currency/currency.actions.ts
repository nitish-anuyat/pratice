import { createAction, props } from "@ngrx/store";
import { Currency, CurrencySettings } from "../../models";

// Handle fetch country list
export const fetchCurrencySettings = createAction(
    "[Get Currency] Get currency settings from API"
);

// Handle fetch currency settings api success
export const fetchCurrencySettingsSuccess = createAction(
    "[Currencies API] Get Currency settings Success",
    props<CurrencySettings>()
);

// Handle fetch currency settings api failed
export const fetchCurrencySettingsFailed = createAction(
    "[Currencies API] Get Currency settings Failed",
    props<{ error: any }>()
);

export const updateCurrency = createAction(
    "[Update Subscriber Currency] Update Subscriber Currency",
    props<{ subscriberCurrency: Currency  | undefined}>()
)

export const updateCurrencySuccess = createAction(
    "[Update Subscriber Currency] Update Subscriber Currency Success",
    props<{ subscriberCurrency: Currency  | undefined}>()
)

export const updateCurrencyFailed = createAction(
    "[Update Subscriber Currency] Update Subscriber Currency Failed",
    props<{ error: any }>()
)