export const increment = () => async (dispatch) => {
  setTimeout(() => {
    dispatch({ type: "INCREMENT" });
  }, 2000);
};

export const decrement = {
  type: "DECREMENT",
};
