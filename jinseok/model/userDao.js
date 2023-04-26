const { dataSource } = require('./dataSource');

const createUser = async (
  email,
  profileImage,
  password,
  name,
  age,
  phoneNumber
) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO users (
          email, profile_image, password, name, age, phone_number 
        ) VALUES (
          ?, ?, ?, ?, ?, ?
        )
      `,
      [email, profileImage, password, name, age, phoneNumber]
    );
  } catch (e) {
    console.log(e);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const isExistedUser = async (email) => {
  try {
    const [result] = await dataSource.query(
      `
      SELECT EXISTS (
        SELECT
        id
        FROM users 
        WHERE email = ?
    ) idExists
    `,
      [email]
    );
    return parseInt(result.idExists);
  } catch (e) {
    console.log(e);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getUser = async (email) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT 
      id, email, profile_image, password, name, age, phone_number
        FROM users
        WHERE email = ? 
        `,
      [email]
    );
    return user;
  } catch (e) {
    console.log(e);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT 
      id, email, profile_image, password, name, age, phone_number
        FROM users
        WHERE id = ? 
        `,
      [id]
    );
    return user;
  } catch (e) {
    console.log(e);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  isExistedUser,
  getUser,
  getUserById,
};
