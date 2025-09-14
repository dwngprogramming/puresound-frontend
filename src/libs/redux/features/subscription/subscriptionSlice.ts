import {BaseSubscription} from "@/models/listener/BaseSubscription";
import {createSlice} from "@reduxjs/toolkit";

const initState: BaseSubscription = {
  code: null,
  billingCycle: null,
  subscriptionType: null,
  subscriptionStatus: null
};

const subscription = createSlice({
  name: 'subscription',
  initialState: initState,
  reducers: {
    setSubscription(state: BaseSubscription, action) {
      state.code = action.payload.code;
      state.billingCycle = action.payload.billingCycle;
      state.subscriptionType = action.payload.subscriptionType;
      state.subscriptionStatus = action.payload.subscriptionStatus;
    },

    removeSubscription(state: BaseSubscription) {
      state.code = null;
      state.billingCycle = null;
      state.subscriptionType = null;
      state.subscriptionStatus = null;
    }
  }
});

export const {setSubscription, removeSubscription} = subscription.actions;
export default subscription.reducer;
