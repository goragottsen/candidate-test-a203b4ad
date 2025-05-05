import { UnknownAction } from "@reduxjs/toolkit";

export type WorkStatus = "looking" | "passive" | "not_looking";

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  workStatus: WorkStatus;
}

export interface SyncableAction extends UnknownAction {
  payload: any;
  meta?: {
    isSync?: boolean;
    originalSource?: string;
  };
}

export interface SyncConfig {
  actionTypes: string[]; // Array of action types to sync
  sourcePrefix: string;  // e.g., 'nav', 'dashboard'
  targetPrefix: string; // e.g., 'nav', 'dashboard'
}
