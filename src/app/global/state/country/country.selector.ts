import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CountryState } from "./country.state";

export const countriesState = createFeatureSelector<CountryState>("country");

export const fetchCountries = createSelector(
    countriesState,
    (state: CountryState) => state.list
);

export const fetchPopularCountries = createSelector(
  fetchCountries,
  (countries) => countries?.filter((country) => country.isPopular) || []
);

export const selectCountry = (props: { _id: string }) =>
  createSelector(fetchCountries, (countries) =>
    countries.find((country) => country._id === props._id)
  );