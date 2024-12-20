// reducer.jsx
const initialState = {
  user: null,
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
        user: { ...state.user, couleur: action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
