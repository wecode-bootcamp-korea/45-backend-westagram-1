const dataSource = require("./dataSource");

const addPost = async (title, content, imgUrl, userId) => {
  try {
    return await dataSource.query(
      `
                INSERT INTO posts(
                    title,
                    content,
                    image_url,
                    user_id
                ) VALUES (?, ?, ?, ?);
            `,
      [title, content, imgUrl, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const posts = async () => {
  try {
    return await dataSource.query(`
                SELECT
                u.id AS userId,
                u.profile_image AS userProfileImage,
                p.user_id AS postingId,
                p.image_url AS postingImageUrl,
                p.content AS postingContent
                FROM posts as p
                INNER JOIN users as u
                ON u.id = p.user_id;
            `);
  } catch (err) {
    const error = new Error(`DATA_NOT_FOUND`);
    error.statusCode = 500;
    throw error;
  }
};

const userPosts = async (userId) => {
  try {
    return await dataSource.query(
      `
                SELECT
                    users.id as userId,
                    users.profile_image as userProfileImage,
                    (
                        SELECT
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                "postingId", posts.id,
                                "postingImageUrl", posts.image_url,
                                "postingContent", posts.content
                            )
                        )
                        FROM posts
                        JOIN users ON users.id = posts.user_id
                        WHERE posts.user_id = ?
                    ) as postings
                    FROM users
                    WHERE users.id = ?;
            `,
      [userId, userId]
    );
  } catch (err) {
    const error = new Error("DATA_NOT_FOUND");
    error.statusCode = 500;
    throw error;
  }
};

const postUpdate = async (postId, content) => {
  console.log("33333333333333", postId, content);
  try {
    await dataSource.query(
      `
            UPDATE posts
            SET
            content = ?
            WHERE id = ?;
        `,
      [content, postId]
    );

    const [result] = await dataSource.query(
      `
            SELECT
            u.id AS userId,
            u.name AS userName,
            p.id AS postId,
            p.title AS postingTitle,
            p.content AS postingContent
            FROM users AS u
            JOIN posts AS p
            ON u.id = p.user_id
            WHERE p.id = ?;
        `,
      [postId]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("DATA_NOT_FOUND");
    error.statusCode = 500;
    throw error;
  }
};

const postDelete = async (userId, postId) => {
  try {
    return await dataSource.query(
      `
            DELETE FROM posts as p
            WHERE p.id = ?
            AND p.user_id = ?;
        `,
      [userId, postId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DATA_NOT_FOUND");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  addPost,
  posts,
  userPosts,
  postUpdate,
  postDelete,
};
