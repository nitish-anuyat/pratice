import { UserState } from "./user";
import { CountryState } from "./country";
import { SubscriptionState } from "./subscriptions";
import { CurrencyState } from "./currency";

export interface State {
  user: UserState;
  country: CountryState;
  subscription: SubscriptionState,
  currency: CurrencyState
}