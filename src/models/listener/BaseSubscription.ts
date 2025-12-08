import {SubscriptionType} from "@/const/subscription/SubscriptionType";
import {SubscriptionStatus} from "@/const/subscription/SubscriptionStatus";
import {BillingCycle} from "@/const/subscription/BillingCycle";

export interface BaseSubscription {
  code: string | null;
  billingCycle: BillingCycle | null;
  subscriptionType: SubscriptionType | null;
  subscriptionStatus: SubscriptionStatus | null;
}
