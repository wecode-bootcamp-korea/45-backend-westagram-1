-- migrate:up
DELETE FROM users WHERE id = 1;
ALTER TABLE users MODIFY COLUMN email VARCHAR(200) Not NULL UNIQUE;

-- migrate:down
ALTER TABLE users MODIFY COLUMN email VARCHAR(200) Not NULL;

