import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schema } from "../models/schema";
import { Profile } from "../models/profile-model";

const adapter = new SQLiteAdapter({
  schema,
  dbName: "offline_first",
  jsi: true,
  onSetUpError: (error) => {
    console.error(error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [ Profile ],
});

