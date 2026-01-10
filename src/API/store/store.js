import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authslice/authslice";

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
export default store;