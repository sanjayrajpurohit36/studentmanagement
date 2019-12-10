import axios from "axios";

export function getAllStudents(dispatch) {
  return axios.get("https://api.myjson.com/bins/1dlper").then(response => {
    dispatch({
      type: "STUDENT_DATA",
      payload: response
    });
  });
}
