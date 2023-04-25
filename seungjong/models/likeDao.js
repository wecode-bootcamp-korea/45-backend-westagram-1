const { post } = require("../routes");
const dataSource = require("./Dao");

const like = async (userId, postId) => {
  console.log(`3333333333:::userId::${userId},postId:::${postId}`);
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
                SELECT id
                FROM likes
                WHERE user_id = ? AND post_id = ?
            ) AS isLiked;
        `,
      [userId, postId]
    );

    if (!!parseInt(result.isLiked)) {
      console.log(`삭제`);
      return await dataSource.query(
        `
            DELETE FROM likes
            WHERE user_id = ? AND post_id = ?;
            `,
        [userId, postId]
      );
    } else {
      console.log(`생성`);
      return await dataSource.query(
        `
                INSERT INTO likes(
                    user_id,
                    post_id
                ) VALUES (?, ?);
            `,
        [userId, postId]
      );
    }
  } catch (err) {
    console.log(err);
    const error = new Error("DATA_NOT_FOUND");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { like };
