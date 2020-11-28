export default function reducer(
  state = {
    studentData: {},
    isApiFetchError: {},
  },
  action
) {
  switch (action.type) {
    case "ALL_STUDENT_DATA":
      return { ...state, studentData: action.payload };
    case "API_FETCH_ERROR":
      return { ...state, isApiFetchError: action.payload };
    default: {
    }
  }

  return state;
}
