import React from "react";
import "./index.css";
import { connect } from "react-redux";
import { loginUserAction } from "../../../Actions/userAction";

const MapStateToProps = store => {
  return {
    userData: store.login.loginData
  };
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        email: "",
        password: ""
      },
      showErr: false,
      showValidateErr: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.userData !== nextProps.userData) {
      if (nextProps.userData) {
        window.localStorage.setItem("user", JSON.stringify(nextProps.userData));
        this.props.history.push({
          pathname: `/dashboard`
        });
        var data = JSON.parse(window.localStorage.getItem("user"));
        if (typeof data !== undefined) {
          this.props.history.push({
            pathname: `/dashboard`
          });
        } else {
          this.props.history.push({
            pathname: `/`
          });
        }
      }
    }
  }

  getUserInfo = e => {
    this.setState({
      showValidateErr: false
    });
    var input = e.target.value;
    if (input && input.length !== 0) {
      var obj = Object.assign({}, this.state.userData);
      var field = e.target.id;
      obj[field] = input;
      this.setState({
        userData: obj
      });
    }
  };

  goToDashboard = () => {
    if (this.state.userData && this.state.userData.length !== 0) {
      var regex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (regex.test(this.state.userData.email))
        this.props.dispatch(loginUserAction(this.state.userData));
      else
        this.setState({
          showValidateErr: true
        });
    }
    this.setState({
      showErr: false
    });
  };

  render() {
    return (
      <div className="login-main-container">
        <div className="row login-container">
          <div className="col-sm-8 col-md-6 col-lg-5 login-container-wrapper">
            <div className="login-title">Student Management</div>
            <div className="login-flex">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                onChange={this.getUserInfo}
                autoComplete="off"
              />
              {this.state.showValidateErr ? <div>Email is invalid.</div> : null}
            </div>
            <div className="login-flex">
              <label>Password</label>
              <input
                type="password"
                id="password"
                onChange={this.getUserInfo}
                autoComplete="off"
              />
            </div>
            <button
              onClick={this.goToDashboard}
              className="login-btn btn-primary btn-lg active"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(MapStateToProps)(Login);
