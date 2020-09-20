const userCart = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMERS":
      return { ...state, ...action.payload };
    case "DELETE_CUSTOMER":
      return { ...action.payload };
    default:
      return state;
  }
};
export default userCart;
