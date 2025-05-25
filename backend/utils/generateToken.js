const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload (user ID)
    process.env.JWT_SECRET, // Secret key from .env
    { expiresIn: '30d' } // Token expiry (optional)
  );
};

module.exports = generateToken;

