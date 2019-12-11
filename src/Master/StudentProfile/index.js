import React from "react";
import { connect } from "react-redux";
import { getAllStudentsData } from "../../Actions/studentAction";
import StudentIcon from "../../Images/user.png";
import noData from "../../Images/noData.png";
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
      studentDetails: {},
      studentData: {}
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
                studentDetails: this.state.studentData[index]
              });
            } else {
              this.setState({
                studentDetails: {}
              });
            }
          }
        }
      );
    }
  }

  //Function to calculate total marks
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
                {Object.keys(this.state.studentDetails) &&
                Object.keys(this.state.studentDetails).length !== 0 ? (
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
                      Name: {this.state.studentDetails.name}{" "}
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="student-info-details">
                          Roll No: {this.state.studentDetails.rollNo}
                        </div>
                        <div className="student-info-details">
                          Class: {this.state.studentDetails.class}
                        </div>
                        <div className="student-info-details">
                          Marks:{" "}
                          {this.getTotalMarks(this.state.studentDetails.marks)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-student-data">
                    <div>
                      <img
                        src={noData}
                        alt="No Data Found"
                        style={{
                          height: "300px",
                          width: "300px"
                        }}
                      />
                    </div>
                  </div>
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
