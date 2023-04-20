-- migrate:up
CREATE TABLE posts (
    post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
DROP TABLE posts;