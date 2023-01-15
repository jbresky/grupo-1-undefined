const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const bcrypt = require("bcryptjs");
// const { generateJwt } = require("../helpers/generate-JWT");
const { signToken } = require("../helpers/generate-JWT");
// const { getByEmail, pwdCompare } = require("../services/users");

module.exports = {
  me: catchAsync(async (req, res, next) => {
    try {
      let user = await User.findByPk(req.user.id);
      user = user.dataValues;
      const { ...rest } = user;
      endpointResponse({
        res,
        message: 'Profile data',
        body: {
          ...rest
        }
      });
    } catch (error) {
      const httpError = createHttpError(error.statusCode, `[Error creating user] - [index - GET]: ${error.message}`);
      next(httpError);
    }
  }),

  login: catchAsync(async (req, res, next) => {
    
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      return endpointResponse({
        res,
        message: `Email and password combination incorrect`,
        body: { ok: false },
      });
    }
    try {
      bcrypt.compare(password, user.password).then((match) => {
        if (match === false) {
          return endpointResponse({
            res,
            message: `Email and password combination incorrect`,
            body: { ok: false },
          });
        } else {
          const token = signToken(user.id)
          res.header('auth-token', token)
          endpointResponse({
            res,
            message: `User logged in succesfully`,
            body: { user, ok: true, token },
          });
        }
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error logging users] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }
  })
}