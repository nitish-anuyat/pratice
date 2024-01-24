import { Subscription, DataUsage } from "../../models";

export interface SubscriptionState {
  dataUsage: DataUsage | undefined;
  subscriptions: Subscription[ ]
}

export const initialState: SubscriptionState = {
  dataUsage: undefined,
  subscriptions: []
};