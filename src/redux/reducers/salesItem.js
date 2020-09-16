const user = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default user;
