-- migrate:up
ALTER TABLE posts RENAME COLUMN post_id to id;

-- migrate:down

