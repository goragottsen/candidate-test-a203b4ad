import { configureStore } from "@reduxjs/toolkit";
import userReducer, { updateWorkStatus } from "./userSlice";
import {
  createSyncMiddleware,
  setupSyncListener,
  SyncConfig,
} from "../../shared/reduxSync";
import type { WorkStatus } from "../../shared/types";

// Re-use exactly the same channel name & action mapping:
const workStatusSync: SyncConfig<WorkStatus> = {
  channelName: "workStatus",
  actionType: updateWorkStatus.type,         // now "navUser/updateWorkStatus"
  recreateAction: (payload) => updateWorkStatus(payload),
};

export const navStore = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefault) =>
    getDefault().concat(createSyncMiddleware(workStatusSync)),
});

setupSyncListener(navStore, workStatusSync);

export type NavRootState = ReturnType<typeof navStore.getState>;
export type NavDispatch = typeof navStore.dispatch;