// export const incement = (data) => {
//   return {
//     type: "INCREMENT",
//     payload: data,
//   };
// };
// export const decrement = () => {
//   return {
//     type: "DECREMENT",
//   };
// };

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
