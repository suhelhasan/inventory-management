const salesChannel = (state = [], action) => {
  switch (action.type) {
    case "SALES_CHANNEL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default salesChannel;
