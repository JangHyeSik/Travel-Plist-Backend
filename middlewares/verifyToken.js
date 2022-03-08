const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  try {
    await jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (decode) {
        req.user = decode;

        next();
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = verifyToken;
