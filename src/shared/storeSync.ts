import { SyncableAction, SyncConfig } from "./types";
import type { Dispatch, Middleware } from "redux";

export class StoreSyncManager <T extends SyncableAction = SyncableAction> {
    private static instance: StoreSyncManager;
    private subscribers: ((event: T) => void)[] = [];
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
  
    publish(event: T): void {
        this.subscribers.forEach(subscriber => subscriber(event));
    }
  
    subscribe(callback: (event: T) => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    createSyncMiddleware(source: string): Middleware<{}, any, Dispatch<T>> {
        return () => (next) => (action) => {
            const result = next(action);
            
            const syncableAction = action as T;
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
                } as T);
            }
            
            return result;
        };
    }
}