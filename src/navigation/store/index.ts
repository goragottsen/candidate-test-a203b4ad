import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const navStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type NavRootState = ReturnType<typeof navStore.getState>;
export type NavDispatch = typeof navStore.dispatch;
