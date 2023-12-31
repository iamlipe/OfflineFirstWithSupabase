create or replace function pull(last_pulled_at bigint default 0) returns jsonb as $$
declare _ts timestamp with time zone;
_profiles jsonb;
begin -- timestamp
_ts := to_timestamp(last_pulled_at / 1000);
--- profiles
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'name',
                    t.name,
                    'website',
                    t.website,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _profiles
from sync_profiles_view t;
return jsonb_build_object(
    'changes',
    jsonb_build_object(
        'profiles',
        _profiles
    ),
    'timestamp',
    timestamp_to_epoch(now())
);
end;
$$ language plpgsql;
