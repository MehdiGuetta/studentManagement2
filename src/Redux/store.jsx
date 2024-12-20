import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer";

const store = configureStore({
  reducer: userReducer,
});

export default store;
