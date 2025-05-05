import { UnknownAction } from "@reduxjs/toolkit";

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