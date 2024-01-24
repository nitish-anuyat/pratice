import { createAction, props } from "@ngrx/store";
import { Country } from "../../models";

export const appLoaded = createAction("[App] App Loaded");

// Handle fetch country list
export const fetchCountryList = createAction(
    "[Get Countries] Get countries from API"
);

// Handle fetch county list api success
export const fetchCountriesSuccess = createAction(
    "[Countries API] Get Countries Success",
    props<{ list: Country[] }>()
);

// Handle fetch country list api failed
export const fetchCountriesFailed = createAction(
    "[Countries API] Get Countries Failed",
    props<{ error: any }>()
);

