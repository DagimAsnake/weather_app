import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../state/auth/userAuthSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

export default store;
