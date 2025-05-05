import { SyncableAction, SyncConfig } from "./types";
import type { Dispatch, Middleware } from "redux";

type StoreEvent = {
    type: string;
    payload: any;
    meta?: {
        isSync?: boolean;
        fromSync?: boolean;
        originalSource?: string;
    };
  };
  
export class StoreSyncManager {
    private static instance: StoreSyncManager;
    private subscribers: ((event: StoreEvent) => void)[] = [];
    private config!: SyncConfig;
  
    private constructor() {}
  
    static getInstance(): StoreSyncManager {
        if (!StoreSyncManager.instance) {
            StoreSyncManager.instance = new StoreSyncManager();
        }
        return StoreSyncManager.instance;
    }

    configure(config: SyncConfig): void {
        this.config = config;
    }
  
    publish(event: StoreEvent): void {
        this.subscribers.forEach(subscriber => subscriber(event));
    }
  
    subscribe(callback: (event: StoreEvent) => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    createSyncMiddleware(source: string): Middleware<{}, any, Dispatch<SyncableAction>> {
        return () => (next) => (action) => {
            const result = next(action);
            
            const syncableAction = action as SyncableAction;
            const shouldSync = this.config.actionTypes.some(type => 
                syncableAction.type.endsWith(type) && 
                !syncableAction.meta?.isSync
            );

            if (shouldSync) {
                this.publish({
                    type: syncableAction.type,
                    payload: syncableAction.payload,
                    meta: { 
                        originalSource: source 
                    }
                });
            }
            
            return result;
        };
    }
}