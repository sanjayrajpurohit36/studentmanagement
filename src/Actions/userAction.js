export function loginUserAction(data) {
  return function(dispatch) {
    dispatch({
      type: "USER_DATA",
      payload: data
    });
  };
}
