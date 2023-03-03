export const selectSubscribeMessage = (state) => state.subscription.message;

export const selectSubscribeError = (state) => state.subscription.error;

export const selectIsSubscribed = (state) => state.subscription.isSubscribed;

export const selectSubcibePending = (state) => state.subscription.isLoading;
