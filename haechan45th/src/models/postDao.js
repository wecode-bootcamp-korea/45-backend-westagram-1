const { dataSource } = require("./dataSource")


const getAllPosts = async () => {
    try {
        const rows = await dataSource.query(
            `SELECT 
                posts.id,
                users.name AS Author,
                posts.title,
                posts.content,
                posts.image_url,
                posts.created_at
                FROM posts 
                INNER JOIN users ON users.id = posts.user_id
                `
        );
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error occurred in getting postdata /postDAO Error");
    }
};

const getSpecificUserPost = async (userId) => {
    try {
        const gettingUserPosts = await dataSource.query(
            `SELECT 
        users.id,
        users.name AS Author,
        posts.title,
        posts.content,
        posts.image_url,
        posts.created_at
        FROM posts 
        INNER JOIN users ON users.id = posts.user_id
        WHERE users.id = ?
        `,
            [userId]
        );

        return gettingUserPosts;
    } catch (error) {
        console.log(error);
        throw new Error("Error has occurred in getting users posts");
    }
};

const getPostById = async (postId) => {
    try {
        const [getPostById] = await dataSource.query(
            `SELECT * FROM posts 
       JOIN users ON users.id = posts.user_id
       WHERE posts.id = ?`,
            [postId]
        );

        return getPostById;
    } catch (error) {
        console.log(error);
        throw new Error("Error has occurred with getPostById /postDAO");
    }
};

const createPosts = async (userId, title, content, imageUrl) => {
    try {
        const [user] = await dataSource.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        if (user) {
            const user_id = user.id;

            await dataSource.query(
                `INSERT INTO posts(
          user_id,
          title,
          content,
          image_url
        ) VALUES (
          ?,
          ?,
          ?,
          ?
        )`,
                [user_id, title, content, imageUrl]
            );

            return { message: "🎉 post has been created successfully 🎉 " };
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        console.log(err);
        throw new Error("Error occurred in CREATING POSTS: " + err.message);
    }
};


const editUserPosts = async (userId, postId, title, content, imageUrl) => {
    try {
        const updatePosts = await dataSource.query(
            `UPDATE posts
        INNER JOIN users ON posts.user_id = users.id
        SET
        posts.title = ?,
        posts.content = ?,
        posts.image_url = ?
        WHERE users.id = ? AND posts.id = ?
        `,
            [title, content, imageUrl, userId, postId]
        );

        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Error has occurred in USER EDITING API");
    }
};


const deleteUserPosts = async (userId, postId) => {
    try {
        const deletePosts = await dataSource.query(
            `DELETE FROM posts
       WHERE posts.id = ? 
      `,
            [userId, postId]
        );

    } catch (error) {
        console.log(error);
        throw new Error("Error has occurred in DELETING USER POSTS /postDAO");
    }
};


module.exports = {
    getPostById, getAllPosts, getSpecificUserPost, createPosts, editUserPosts, deleteUserPosts
}