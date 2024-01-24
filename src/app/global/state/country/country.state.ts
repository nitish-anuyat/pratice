import { Country } from "../../models";

export interface CountryState {
  list: Country[];
}

export const initialState: CountryState = {
  list: []
};