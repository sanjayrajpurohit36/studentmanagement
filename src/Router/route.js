import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Master/Auth/Login/index";
import Dashboard from "../Master/StudentDashboard/index";
// import UserInfo from "../Master/UserInfo/userInfo";

const Routes = (
  <Router>
    <Route path={"/"} component={Login} exact />
    <Route path={"/dashboard"} component={Dashboard} exact />
    {/* <Route path={"/dashboard/:id"} component={UserInfo} exact /> */} */}
  </Router>
);
export default Routes;
