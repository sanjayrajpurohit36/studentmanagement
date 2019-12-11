import axios from "axios";

export function getAllStudentsData(dispatch) {
  return axios.get("https://api.myjson.com/bins/1dlper").then(response => {
    dispatch({
      type: "ALL_STUDENT_DATA",
      payload: response
    });
  });
}
