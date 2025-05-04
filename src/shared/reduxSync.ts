import { Middleware } from "@reduxjs/toolkit";
import type { Dispatch, Store } from "redux";
import { ChannelMessage, SyncableAction, SyncConfig } from "./types";

/** Wrapper around BroadcastChannel with a localStorage fallback */
class Channel<T> {
  private bc: BroadcastChannel | null = null;
  private key: string;
  onmessage: ((msg: ChannelMessage<T>) => void) | null = null;

  constructor(name: string) {
    this.key = `redux-sync-${name}`;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      this.bc = new BroadcastChannel(name);
      this.bc.onmessage = (ev) => this.handle(ev.data as ChannelMessage<T>);
    } else {
      (window as Window).addEventListener("storage", (ev) => {
        if (ev.key === this.key && ev.newValue) {
          this.handle(JSON.parse(ev.newValue));
        }
      });
    }
  }

  post(message: ChannelMessage<T>) {
    if (this.bc) {
      this.bc.postMessage(message);
    } else {
      localStorage.setItem(this.key, JSON.stringify(message));
    }
  }

  private handle(msg: ChannelMessage<T>) {
    if (this.onmessage) this.onmessage(msg);
  }
}

/** Middleware: when the matching action is dispatched locally (and isn’t “remote”), broadcast it */
export function createSyncMiddleware<T>(
  config: SyncConfig<T>
): Middleware<{}, any, Dispatch<SyncableAction<T>>> {
  const chan = new Channel<T>(config.channelName);

  return () => (next) => (action) => {
    const result = next(action);

    const syncableAction = action as SyncableAction<T>;
    if (
      syncableAction.type === config.actionType &&
      !syncableAction.meta?.remote
    ) {
      chan.post({ payload: syncableAction.payload });
    }

    return result;
  };
}

/** Listener: subscribe to the channel and re-dispatch incoming actions with meta.remote */
export function setupSyncListener<T>(
  store: Store,
  config: SyncConfig<T>
) {
  const chan = new Channel<T>(config.channelName);
  chan.onmessage = ({ payload }) => {
    const action = config.recreateAction(payload);
    // tag it so our middleware won’t re-broadcast
    store.dispatch({ ...action, meta: { remote: true } });
  };
}
