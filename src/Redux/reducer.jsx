// reducer.jsx
const initialState = {
  user: null,
  color: "",
  request: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return initialState;
    case "UPDATE_COLOR":
      return {
        ...state,
        color: action.payload,
      };
    case "ADD_REQUEST":
      return {
        user: {
          ...state.user,
          requests: [...state.user.requests, action.payload],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
