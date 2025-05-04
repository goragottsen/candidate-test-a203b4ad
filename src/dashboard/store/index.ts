import { configureStore } from "@reduxjs/toolkit";
import userReducer, { updateWorkStatus } from "./userSlice";
import {
  createSyncMiddleware,
  setupSyncListener,
} from "../../shared/reduxSync";
import {
  SyncConfig,
} from "../../shared/types";
import type { WorkStatus } from "../../shared/types";

// 1) Define what we’re syncing:
const workStatusSync: SyncConfig<WorkStatus> = {
  channelName: "workStatus",                      // arbitrary but shared name
  actionType: updateWorkStatus.type,              // e.g. "dashboardUser/updateWorkStatus"
  recreateAction: (payload) => updateWorkStatus(payload),
};

// 2) Add the middleware, then call the listener
export const dashboardStore = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefault) =>
    getDefault().concat(createSyncMiddleware(workStatusSync)),
});

// 3) Wire up the incoming channel:
setupSyncListener(dashboardStore, workStatusSync);

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;
