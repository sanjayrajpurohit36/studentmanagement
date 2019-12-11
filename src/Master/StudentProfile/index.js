import React from "react";
import { connect } from "react-redux";
import { getAllStudentsData } from "../../Actions/studentAction";
import StudentIcon from "../../Images/user.png";
import "./index.css";

const mapStateToProps = store => {
  return {
    studentData: store.student.studentData
  };
};
class StudentData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentInfo: {},
      studentData: {},
      loader: true
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudentsData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData && nextProps.studentData.length !== 0) {
      this.setState(
        {
          studentData: nextProps.studentData.data
        },
        () => {
          var loc = window.location.pathname.split("/");
          if (loc && loc.length === 3) {
            var index = parseInt(loc[2]);
            if (this.state.studentData[index] !== undefined) {
              this.setState({
                studentInfo: this.state.studentData[index],
                loader: false
              });
            } else {
              this.setState({
                loader: false,
                studentInfo: {}
              });
            }
          }
        }
      );
    }
  }

  getTotalMarks = marks => {
    var totalMarks = 0;
    Object.keys(marks).map(value => {
      totalMarks += marks[value];
    });
    return totalMarks;
  };

  goToDashboard = () => {
    this.props.history.push({
      pathname: `/dashboard`
    });
  };

  render() {
    return (
      <div className="dashboard-main-container">
        <div className="dashboard-container-wrapper">
          <div className="dashboard-nav row">
            <div
              className="col-sm-12 col-md-12 col-lg-12 dashboard-nav-wrapper"
              onClick={this.goToDashboard}
              style={{
                justifyContent: "start",
                cursor: "pointer",
                fontSize: "25px"
              }}
            >
              Back
            </div>
          </div>
          <div className="row login-container">
            <div className="col-sm-8 col-md-6 col-lg-5 student-info-main-container">
              <div className="login-flex">
                {Object.keys(this.state.studentInfo) &&
                Object.keys(this.state.studentInfo).length !== 0 ? (
                  <div className="student-info-container col-sm-12 col-md-12 col-lg-12">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <img
                        src={StudentIcon}
                        alt="student-img"
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 student-info-name">
                      Name: {this.state.studentInfo.name}{" "}
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="student-info-details">
                          Roll No: {this.state.studentInfo.rollNo}
                        </div>
                        {/* <div>Name: {this.state.studentInfo.name}</div> */}
                        <div className="student-info-details">
                          Class: {this.state.studentInfo.class}
                        </div>
                        <div className="student-info-details">
                          Marks:{" "}
                          {this.getTotalMarks(this.state.studentInfo.marks)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-student">No student found!!!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(StudentData);
