import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubscriptionState } from "./subscriptions.state";
import { Subscription } from "../../models";

export const selectSubscription = createFeatureSelector<SubscriptionState>("subscription");

export const selectDataUsage = createSelector(
  selectSubscription,
  (state: SubscriptionState) => state.dataUsage
);

export const selectAllSubscription = createSelector(
  selectSubscription,
  (state: SubscriptionState) => state.subscriptions
);

export const selectSubscriptionByStatus = (props: { status: string }) => createSelector(
  selectAllSubscription,
  (subscriptions : Subscription[]) => {
    if(props.status.includes('/')){
      const statusArray = props.status.split('/');
      return subscriptions?.filter((subscription) => subscription.status === statusArray[0] || subscription.status === statusArray[1]) ?? []
    } else {
      return subscriptions?.filter((subscription) => subscription.status === props.status) ?? []
    }
    
  }
  
);