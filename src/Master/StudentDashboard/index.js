import React from "react";
import { getAllStudentsData } from "../../Actions/studentAction";
import { connect } from "react-redux";
import ImgUpward from "assets/images/up-arrow.png";
import ImgDownward from "assets/images/download-arrow.png";
import Loader from "assets/images/loader.svg";
import noData from "assets/images/noData.png";
import "./index.css";

const mapStateToProps = (store) => {
  return {
    studentData: store.student.studentData,
  };
};

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoader: true,
      studentData: {},
      isSortAlphabet: true,
      isSortMarks: true,
      isSortAlphabetIcon: true,
      isSortMarksIcon: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudentsData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData && nextProps.studentData.length !== 0) {
      this.setState({
        studentData: nextProps.studentData.data,
        isLoader: false,
      });
    }
  }

  getStudentData(values) {
    var studentInfo = Object.assign({}, values);
    var rollNo = studentInfo[rollNo];
    this.props.history.push({
      pathname: `/dashboard/${studentInfo.rollNo}`,
      state: {
        studentInfo: studentInfo,
      },
    });
  }

  // Function to search data
  searchStudent = (e) => {
    var input = e.target.value.toLowerCase();
    this.setState(
      {
        studentData: this.props.studentData.data,
      },
      () => {
        var res = Object.keys(this.state.studentData)
          .filter(
            (keys) =>
              this.state.studentData[keys].name.toLowerCase().indexOf(input) >
              -1
          )
          .reduce(
            (res, key) =>
              Object.assign(res, { [key]: this.state.studentData[key] }),
            {}
          );

        this.setState({
          studentData: res,
        });
        if (input === "") {
          this.setState({
            studentData: this.props.studentData.data,
          });
        }
      }
    );
  };

  // Function to sort data in (asc.-desc.) order
  sortData(type) {
    if (
      Object.keys(this.state.studentData) &&
      Object.keys(this.state.studentData).length !== 0
    ) {
      var list = Object.assign({}, this.state.studentData);
      var resultofSort = Object.values(list).sort(
        function (a, b) {
          if (type === "sortByAlphabet") {
            if (a.name < b.name) return -1;

            if (a.name > b.name) return 1;

            this.setState({
              isSortAlphabet: !this.state.isSortAlphabet,
              isSortAlphabetIcon: true,
            });

            return 0;
          } else if (type === "sortByReverseAlphabet") {
            if (a.name > b.name) return -1;

            if (a.name < b.name) return 1;

            this.setState({
              isSortAlphabet: !this.state.isSortAlphabet,
              isSortAlphabetIcon: false,
            });

            return 0;
          } else if (type === "sortByIncOrderOfMarks") {
            let marks1 = 0;
            let marks2 = 0;
            Object.keys(a.marks).map((value) => {
              marks1 += a.marks[value];
            });
            Object.keys(b.marks).map((value) => {
              marks2 += b.marks[value];
            });

            if (marks1 < marks2) return -1;

            if (marks1 > marks2) return 1;

            this.setState({
              isSortMarks: !this.state.isSortMarks,
              isSortMarksIcon: true,
            });
            return 0;
          } else {
            let marks1 = 0;
            let marks2 = 0;
            Object.keys(a.marks).map((value) => {
              marks1 += a.marks[value];
            });
            Object.keys(b.marks).map((value) => {
              marks2 += b.marks[value];
            });

            if (marks1 > marks2) return -1;

            if (marks1 < marks2) return 1;

            this.setState({
              isSortMarks: !this.state.isSortMarks,
              isSortMarksIcon: false,
            });

            return 0;
          }
        }.bind(this)
      );
    }
    this.setState({
      studentData: resultofSort,
    });
  }

  //Function to calculate total marks
  getTotalMarks = (marks) => {
    var totalMarks = 0;
    Object.keys(marks).map((value) => {
      totalMarks += marks[value];
    });

    return totalMarks;
  };

  render() {
    return (
      <div className="dashboard-main-container">
        {this.state.isLoader ? (
          <div className="loader">
            <img src={Loader} alt="loader" />
          </div>
        ) : (
          <div className="dashboard-container-wrapper">
            <div className="dashboard-nav row">
              <div className="col-sm-12 col-md-12 col-lg-12 dashboard-nav-wrapper">
                <div className="col-sm-8 col-md-5 col-lg-5">
                  <input
                    placeholder="Search"
                    onChange={this.searchStudent}
                    className="student-search"
                  ></input>
                </div>
                <div className="col-md-4 col-lg-4 btn">
                  <button
                    className="btn btn-primary"
                    onClick={
                      this.state.isSortAlphabet
                        ? this.sortData.bind(this, "sortByAlphabet")
                        : this.sortData.bind(this, "sortByReverseAlphabet")
                    }
                    style={{ width: "98px" }}
                  >
                    Name{" "}
                    <span>
                      <img
                        src={
                          this.state.isSortAlphabetIcon
                            ? ImgUpward
                            : ImgDownward
                        }
                        className="alphabet-icon"
                        width="30%"
                        height="22px"
                      />
                    </span>
                  </button>
                  <button
                    className="btn btn-success btn-sortByMarks"
                    onClick={
                      this.state.isSortMarks
                        ? this.sortData.bind(this, "sortByIncOrderOfMarks")
                        : this.sortData.bind(this)
                    }
                    style={{
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Marks{" "}
                    <span>
                      <img
                        src={
                          this.state.isSortMarksIcon ? ImgUpward : ImgDownward
                        }
                        className="alphabet-icon"
                        width="30%"
                        height="22px"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-data col-sm-12 col-md-12 col-lg-12">
              {Object.keys(this.state.studentData) &&
              Object.keys(this.state.studentData).length !== 0 ? (
                <div className="row" style={{ paddingTop: "60px" }}>
                  {Object.keys(this.state.studentData).map((value, key) => {
                    return (
                      <div
                        className="col-sm-12 col-md-6 col-lg-4 dashboard-margin"
                        key={key}
                      >
                        <div
                          className="student-card"
                          onClick={this.getStudentData.bind(
                            this,
                            this.state.studentData[value]
                          )}
                        >
                          <div>Id: {this.state.studentData[value].rollNo}</div>
                          <div>Name: {this.state.studentData[value].name}</div>
                          <div>
                            Total Marks:{" "}
                            {this.getTotalMarks(
                              this.state.studentData[value].marks
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="noData">
                  <div>
                    <img
                      src={noData}
                      alt="loader"
                      style={{ height: "400px", width: "400px" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(StudentDashboard);
