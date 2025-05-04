import { UnknownAction } from "@reduxjs/toolkit";

export type WorkStatus = "looking" | "passive" | "not_looking";

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  workStatus: WorkStatus;
}

export interface SyncableAction<T> extends UnknownAction {
  payload: T;
  meta?: {
    remote?: boolean;
  };
}

export interface ChannelMessage<T> {
  payload: T;
}

export interface SyncConfig<T> {
  channelName: string;
  actionType: string;
  recreateAction: (payload: T) => SyncableAction<T>;
}
