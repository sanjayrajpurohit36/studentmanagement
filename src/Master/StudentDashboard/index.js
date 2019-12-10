import React from "react";
import { getAllStudents } from "../../Actions/studentAction";
import { connect } from "react-redux";
import "./index.css";

const mapStateToProps = store => {
  return {
    studentData: store.student.studentData
  };
};

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentData: {},
      sortAlphabet: true,
      sortMarks: true
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudents);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData && nextProps.studentData.length !== 0) {
      this.setState({
        studentData: nextProps.studentData.data
      });
    }
  }

  getTheStudentData(values) {
    var studentInfo = Object.assign({}, values);
    var rollNo = studentInfo[rollNo];
    this.props.history.push({
      pathname: `/dashboard/${studentInfo.rollNo}`,
      state: {
        studentInfo: studentInfo
      }
    });
  }

  searchStudent = e => {
    var input = e.target.value.toUpperCase();
    this.setState(
      {
        studentData: this.props.studentData.data
      },
      () => {
        var res = Object.keys(this.state.studentData)
          .filter(
            keys =>
              this.state.studentData[keys].name.toUpperCase().indexOf(input) >
              -1
          )
          .reduce(
            (res, key) =>
              Object.assign(res, { [key]: this.state.studentData[key] }),
            {}
          );

        this.setState({
          studentData: res
        });
        if (input === "") {
          this.setState({
            studentData: this.props.studentData.data
          });
        }
      }
    );
  };

  sortData(type) {
    if (
      Object.keys(this.state.studentData) &&
      Object.keys(this.state.studentData).length !== 0
    ) {
      var list = Object.assign({}, this.state.studentData);
      var resultofSort = Object.values(list).sort(
        function(a, b) {
          if (type === "sortByAlphabet") {
            if (a.name < b.name) return -1;

            if (a.name > b.name) return 1;

            this.setState({
              sortAlphabet: false
            });

            return 0;
          } else if (type === "sortByReverseAlphabet") {
            if (a.name > b.name) return -1;

            if (a.name < b.name) return 1;

            this.setState({
              sortAlphabet: true
            });

            return 0;
          } else if (type === "sortByIncOrderOfMarks") {
            let marks1 = 0;
            let marks2 = 0;
            Object.keys(a.marks).map(value => {
              marks1 += a.marks[value];
            });
            Object.keys(b.marks).map(value => {
              marks2 += b.marks[value];
            });

            if (marks1 < marks2) return -1;

            if (marks1 > marks2) return 1;

            this.setState({
              sortMarks: false
            });
            return 0;
          } else {
            let marks1 = 0;
            let marks2 = 0;
            Object.keys(a.marks).map(value => {
              marks1 += a.marks[value];
            });
            Object.keys(b.marks).map(value => {
              marks2 += b.marks[value];
            });

            if (marks1 > marks2) return -1;

            if (marks1 < marks2) return 1;

            this.setState({
              sortMarks: true
            });

            return 0;
          }
        }.bind(this)
      );
    }
    this.setState({
      studentData: resultofSort
    });
  }

  getTotalMarks = marks => {
    var totalMarks = 0;
    Object.keys(marks).map(value => {
      totalMarks += marks[value];
    });
    return totalMarks;
  };

  render() {
    return (
      <div className="dashboard-main-container">
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
                    this.state.sortAlphabet
                      ? this.sortData.bind(this, "sortByAlphabet")
                      : this.sortData.bind(this, "sortByReverseAlphabet")
                  }
                >
                  {this.state.sort ? "Sort By A-Z" : "Sort ByZ-A"}
                </button>
                <button
                  className="btn btn-success btn-sortByMarks"
                  onClick={
                    this.state.sortMarks
                      ? this.sortData.bind(this, "sortByIncOrderOfMarks")
                      : this.sortData.bind(this)
                  }
                >
                  {this.state.sort2 ? "Increasing Order" : "Decreasing Order"}
                </button>
              </div>
            </div>
          </div>
          <div className="dashboard-data col-sm-10 col-md-10 col-lg-10">
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
                        className="dashboard-card"
                        onClick={this.getTheStudentData.bind(
                          this,
                          this.state.studentData[value]
                        )}
                      >
                        <div style={{ width: "100px", margin: "auto" }}></div>
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
              <div className="not-found">
                <div>No Data Available</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(StudentDashboard);
