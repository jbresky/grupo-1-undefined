const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const bcrypt = require("bcryptjs");

module.exports = {
  loginUser: catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const userInfo = await User.findOne({where: { email: email }})
    if(!userInfo) {
      return endpointResponse({
        res,
        message: `Email and password combination incorrect`,
        body: { ok: false },
      });
    }
    try {
      bcrypt.compare(password, userInfo.password).then((match) => {
        if (match === false) {
          return endpointResponse({
            res,
            message: `Email and password combination incorrect`,
            body: { ok: false },
          });
        } else {
          endpointResponse({
            res,
            message: `User logged in succesfully`,
            body: {userInfo, ok: true},
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