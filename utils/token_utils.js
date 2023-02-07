const fs = require('fs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../constant')

module.exports = {
  parseToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return false;
    }
  },
  generateToken(user, exp) {
    if (!user) return null;

    !exp && (exp = Math.floor(Date.now() / 1000) + (30 * 60));
    
    return jwt.sign({
      exp,
      sub: user,
      iat: Math.floor(Date.now() / 1000) - 30, // 向前追溯30s
    }, JWT_SECRET)
  }
}