import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const dashboardStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;
