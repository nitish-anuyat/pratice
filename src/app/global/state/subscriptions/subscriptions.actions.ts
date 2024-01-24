import { createAction, props } from "@ngrx/store";
import { Subscription, DataUsage } from "../../models";

export const setDataUsageDetails = createAction("[Set Subscriptions Flow] set data usage in progress");

export const setDataUsageSuccess = createAction(
    "[Set Subscriptions Flow] Set data usage successfully",
    props<{ dataUsage : DataUsage}>()
);

export const setDataUsageFailed = createAction(
    "[Subscriptions Flow] Set data usage failed",
    props<{ error: any }>()
);

export const setSubscriptionsDetails = createAction("[Set Subscriptions Flow] set subscriptions in progress");

export const setSubscriptionsSuccess = createAction(
    "[Set Subscriptions Flow] Set subscriptions successfully",
    props<{ subscriptions : Subscription[]}>()
);

export const setSubscriptionsFailed = createAction(
    "[Subscriptions Flow] set subscriptions failed",
    props<{ error: any }>()
);

export const setSubscriptionStatus = createAction("[Set Subscriptions Flow] set subscription status in progress", props<{ subscription : Subscription}>());

export const setSubscriptionStatusSuccess = createAction(
    "[Set Subscriptions Flow] Set subscription status successfully",
    props<{ subscription : Subscription}>()
);

export const setSubscriptionStatusFailed = createAction(
    "[Subscriptions Flow] set subscription status failed",
    props<{ error: any }>()
);

export const addSubscription = createAction("[Set Subscriptions Flow] Add subscription in progress", props<{ subscription : Subscription}>());

export const addSubscriptionSuccess = createAction(
    "[Set Subscriptions Flow] Add subscription successfully",
    props<{ subscription : Subscription}>()
);

export const addSubscriptionFailed = createAction(
    "[Subscriptions Flow] Add subscription failed",
    props<{ error: any }>()
);