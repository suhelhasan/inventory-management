const salesRecord = (state = {}, action) => {
  switch (action.type) {
    case "SALES_RECORD":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default salesRecord;
