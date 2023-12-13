CREATE VIEW profiles_view AS
SELECT
    profiles.id,
    profiles.created_at,
    profiles.deleted_at,
    profiles.server_created_at,
    profiles.user_id,
    profiles.name,
    profiles.updated_at,
    profiles.last_modified_at
FROM
    profiles;
