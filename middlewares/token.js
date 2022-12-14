const jwt = require('../helpers/generate-JWT')

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Necesitas enviar un token.'
    });
  }

  if (!authorization.split(' ')[1]) {
    return res.status(401).json({
      message: 'Necesitas enviar un token.'
    });
  }

  const token = authorization.split(' ')[1];
  if (!jwt.verify(token)) {
    return res.status(401).json({
      message: 'Token inválido.'
    });
  }

  const user = jwt.decode(token);

  req.user = user;
  req.token = token;

  next();
};

module.exports = validateToken;