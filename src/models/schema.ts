import { appSchema, tableSchema } from "@nozbe/watermelondb";

export enum TableName {
  PROFILES = "profiles",
}

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TableName.PROFILES,
      columns: [
        { name: "user_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "website", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});