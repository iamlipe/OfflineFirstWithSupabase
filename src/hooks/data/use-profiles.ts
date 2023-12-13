import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";
import { Profile } from "../../models/profile-model";
import { TableName } from "../../models/schema";

export function useProfiles() {
  const database = useDatabase();

  const [profiles, setProfiles] = useState<Profile[]>();

  let profilesQuery = database.collections
    .get<Profile>(TableName.PROFILES)
    .query();

  useEffect(() => {
    const subscription = profilesQuery.observe().subscribe((data) => {
      setProfiles(data);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { profiles };
}