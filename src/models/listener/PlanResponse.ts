import {BillingCycle} from "@/const/subscription/BillingCycle";
import {SubscriptionType} from "@/const/subscription/SubscriptionType";

export interface PlanResponse {
  id: string;
  billingCycle: BillingCycle;
  subscriptionType: SubscriptionType;
  price: number;
  currency: string;
}
