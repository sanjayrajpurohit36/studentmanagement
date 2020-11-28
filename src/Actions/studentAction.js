import axios from "axios";

export function getAllStudentsData(dispatch) {
  return axios
    .get("https://api.myjson.com/bins/1dlper")
    .then((response) => {
      dispatch({
        type: "ALL_STUDENT_DATA",
        payload: response && response.length !== 0 ? response : [],
      });
    })
    .catch((error) => {
      dispatch({
        type: "API_FETCH_ERROR",
        payload: { isFetchError: true },
      });
    });
}
