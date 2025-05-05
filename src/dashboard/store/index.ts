import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { StoreSyncManager } from "../../shared/storeSync";

const syncManager = StoreSyncManager.getInstance();

syncManager.configure({
  actionTypes: ['/updateWorkStatus'], // Multiple action types can be set here
  sourcePrefix: 'dashboard',
  targetPrefix: 'nav'
});

// Subscribe to updates
syncManager.subscribe((event) => {
  if (event.meta?.originalSource === 'nav') {
      const newType = event.type.replace('nav', 'dashboard');
      dashboardStore.dispatch({ 
          type: newType,
          payload: event.payload,
          meta: { isSync: true }
      });
  }
});

export const dashboardStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(syncManager.createSyncMiddleware('dashboard'))
});

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;