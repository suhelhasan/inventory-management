const userCart = (state = [], action) => {
  switch (action.type) {
    case "CUSTOMER_ITEMS":
      return [...state, ...action.payload];
    case "REMOVE_CUSTOMER_ITEMS":
      return [...state].filter(
        (item) => item.itemName !== action.payload.itemName
      );
    case "REMOVE_ALL_ITEMS":
      return [];
    default:
      return state;
  }
};
export default userCart;
