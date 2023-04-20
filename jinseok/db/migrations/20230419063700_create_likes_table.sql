-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    posts_id INT NOT NULL,
    UNIQUE (user_id, posts_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (posts_id) REFERENCES posts (post_id)
    
)

-- migrate:down
DROP TABLE likes;