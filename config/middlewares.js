const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
  authenticate,
  newToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
};

//create token,
function newToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1h',
    jwtid: '45678'
  };
  //note that secret is already declared in ./_secrets/keys.jwtkey which is being exported in that file so we only need to sign this.
  //on a side note given the structure of the token it should go payload,options,secret but I'm not picky it's fine.
  return jwt.sign(payload, jwtKey, options);
};
