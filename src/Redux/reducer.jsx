// reducer.jsx
const initialState = {
  user: JSON.parse(localStorage.getItem("connectedUser")) || null,
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
      localStorage.removeItem("connectedUser"); // Remove user on logout
      return { ...state, user: null };
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
