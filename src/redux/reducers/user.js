const user = (state = {}, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      console.log(action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default user;
