export const isLoggedIn = () => {
  return {
    type: "SIGN_IN",
  };
};

export const userDetails = (details) => {
  return {
    type: "USER_DETAILS",
    payload: details,
  };
};

export const salesChannelAction = (details) => {
  return {
    type: "SALES_CHANNEL",
    payload: details,
  };
};

export const salesItem = (details) => {
  return {
    type: "ADD_ITEMS",
    payload: details,
  };
};
