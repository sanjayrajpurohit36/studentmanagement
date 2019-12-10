export default function reducer(
  state = {
    loginData: {},
    logoutData: {}
  },
  action
) {
  switch (action.type) {
    case "USER_DATA":
      return { ...state, loginData: action.payload };
    case "USER_LOGOUT":
      return { ...state, logoutData: action.payload };
    default: {
    }
  }

  return state;
}
