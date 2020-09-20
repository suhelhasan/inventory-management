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

export const customerItems = (details) => {
  return {
    type: "CUSTOMER_ITEMS",
    payload: details,
  };
};
export const removeCustomerItems = (details) => {
  return {
    type: "REMOVE_CUSTOMER_ITEMS",
    payload: details,
  };
};
export const removeAllCustomerItems = (details) => {
  return {
    type: "REMOVE_ALL_ITEMS",
    payload: details,
  };
};
export const allCustomers = (details) => {
  return {
    type: "CUSTOMERS",
    payload: details,
  };
};
export const deleteCustomer = (details) => {
  return {
    type: "DELETE_CUSTOMER",
    payload: details,
  };
};
