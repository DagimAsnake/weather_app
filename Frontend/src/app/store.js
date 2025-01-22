import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../state/auth/userAuthSlice";
import favouriteReducer from "../state/favourite/favouriteSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    favourite: favouriteReducer
  },
});

export default store;
