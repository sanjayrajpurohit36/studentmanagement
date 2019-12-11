import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Master/Auth/Login/index";
import Dashboard from "../Master/StudentDashboard/index";
import StudentProfile from "../Master/StudentProfile/index";

const Routes = (
  <Router>
    <Route path={"/"} component={Login} exact />
    <Route path={"/dashboard"} component={Dashboard} exact />
    <Route path={"/dashboard/:id"} component={StudentProfile} exact />
  </Router>
);
export default Routes;
