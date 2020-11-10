const shopDetails = (state = {}, action) => {
  switch (action.type) {
    case "SHOP_DETAILS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default shopDetails;
