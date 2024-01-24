import { Action, createReducer, on } from "@ngrx/store";
import * as SubscriptionsActions from "./subscriptions.actions";
import { initialState, SubscriptionState } from "./subscriptions.state";

const subscriptionReducer = createReducer(
  initialState,
  on(SubscriptionsActions.setDataUsageSuccess, (state, { dataUsage }) =>{
    return ({
      ...state,
      dataUsage: dataUsage
    })
  }),
  on(SubscriptionsActions.setSubscriptionsSuccess, (state, { subscriptions }) =>{
    return ({
      ...state,
      subscriptions: subscriptions
    })
  }),
  on(SubscriptionsActions.setSubscriptionStatusSuccess, (state, subscription: any) => {
    const activeSubscription = state?.subscriptions?.find((plan) => plan.status === 'active');
    const updatedSubscriptions = state?.subscriptions?.map((plan : any) => {
      if(plan._id === subscription?._id){
        return {...plan, status: subscription.status, expiryDate: subscription.expiryDate, totalData: subscription.totalData };
      }
      if(plan._id === activeSubscription?._id){
        return {...plan, status: 'expired'};
      }
      return plan;
    });
    return ({
      ...state,
      subscriptions: updatedSubscriptions
    })
  }),
  on(SubscriptionsActions.addSubscriptionSuccess, (state, subscription : any) =>{
    const newPlan = state?.subscriptions?.find((plan) => plan._id === subscription._id);
    return ({
      ...state,
      subscriptions: newPlan ? state.subscriptions : [...state.subscriptions, subscription]
    })
  }),
);

export function reducer(state: SubscriptionState | undefined, action: Action) {
  return subscriptionReducer(state, action);
}