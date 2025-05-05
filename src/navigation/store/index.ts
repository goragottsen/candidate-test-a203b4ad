import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { StoreSyncManager } from "../../shared/storeSync";

const syncManager = StoreSyncManager.getInstance();

syncManager.configure({
  actionTypes: ['/updateWorkStatus'], // Multiple action types can be set here
  sourcePrefix: 'nav',
  targetPrefix: 'dashboard'
});

syncManager.subscribe((event) => {
  if (event.meta?.originalSource === 'dashboard') {
      const newType = event.type.replace('dashboard', 'nav');
      navStore.dispatch({ 
          type: newType,
          payload: event.payload,
          meta: { isSync: true }
      });
  }
});

export const navStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(syncManager.createSyncMiddleware('nav'))
});

export type NavRootState = ReturnType<typeof navStore.getState>;
export type NavDispatch = typeof navStore.dispatch;