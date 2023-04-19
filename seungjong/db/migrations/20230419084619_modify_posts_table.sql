-- migrate:up
ALTER TABLE posts ADD image_url VARCHAR(3000) Null;

-- migrate:down

