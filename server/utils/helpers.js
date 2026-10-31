const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user
 * @param {string} userId - The user's MongoDB _id
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * Build a user response object (without password)
 * @param {Object} user - Mongoose user document
 * @param {string} token - JWT token (optional)
 * @returns {Object} Sanitized user data with optional token
 */
const buildUserResponse = (user, token) => {
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  if (token) {
    data.token = token;
  }
  return data;
};

/**
 * Get start and end of the current day (UTC)
 * @returns {{ start: Date, end: Date }}
 */
const getTodayRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return { start, end };
};

module.exports = {
  generateToken,
  buildUserResponse,
  getTodayRange,
};
