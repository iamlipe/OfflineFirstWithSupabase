import { SyncDatabaseChangeSet, synchronize } from '@nozbe/watermelondb/sync'
import { database } from './watermelon'
import { supabase } from './supabase'

export async function sync() {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
          console.log("🍉 Pulling changes ...", { lastPulledAt });
        
          const { data, error } = await supabase.rpc("pull", {
            last_pulled_at: lastPulledAt,
          });

          if (error) {
            throw new Error("🍉".concat(error.message));
          }
    
          const { changes, timestamp } = data as {
            changes: SyncDatabaseChangeSet;
            timestamp: number;
          };
    
          console.log(`🍉 Changes pulled at ${new Date(timestamp).toISOString()}`);
    
          return { changes, timestamp };
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
          console.log("🍉 Pushing changes ...");
    
          const { error } = await supabase.rpc("push", { changes });
    
          if (error) {
            throw new Error("🍉".concat(error.message));
          }
    
          console.log(`🍉 Changes pushed at ${new Date().toISOString()} UTC`);
        },
        unsafeTurbo: false,
        sendCreatedAsUpdated: true,
      });
}

