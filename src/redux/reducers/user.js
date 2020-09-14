const user = (state = {}, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default user;
