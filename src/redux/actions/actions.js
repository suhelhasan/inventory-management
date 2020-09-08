export const incement = (data) => {
  return {
    type: "INCREMENT",
    payload: data,
  };
};
export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const isLoggedIn = () => {
  return {
    type: "SIGN_IN",
  };
};
