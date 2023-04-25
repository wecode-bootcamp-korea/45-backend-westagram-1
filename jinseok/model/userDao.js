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
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
