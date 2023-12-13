create or replace function push(changes jsonb) returns void as $$
declare new_profile jsonb;
declare updated_profile jsonb;
begin
-- create profiles
for new_profile in
select jsonb_array_elements((changes->'profiles'->'created')) loop perform create_profile(
        (new_profile->>'id')::uuid,
        (new_profile->>'user_id')::uuid,
        (new_profile->>'name'),
        epoch_to_timestamp(new_profile->>'created_at'),
        epoch_to_timestamp(new_profile->>'updated_at')
    );
end loop;
-- delete profiles
with changes_data as (
    select jsonb_array_elements_text(changes->'profiles'->'deleted')::uuid as deleted
)
-- update profiles
update profiles
set deleted_at = now(),
    last_modified_at = now()
from changes_data
where profiles.id = changes_data.deleted;
end;
$$ language plpgsql;
