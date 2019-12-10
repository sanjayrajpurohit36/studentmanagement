import { combineReducers } from "redux";
import login from "./userReducer";
import student from "./studentReducer";

const appReducer = combineReducers({
  login,
  student
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
