export default function reducer(
  state = {
    studentData: {}
  },
  action
) {
  switch (action.type) {
    case "ALL_STUDENT_DATA":
      return { ...state, studentData: action.payload };
    default: {
    }
  }

  return state;
}
