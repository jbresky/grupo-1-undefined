const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error.js");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/generate-JWT.js");



// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll();
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getId: catchAsync(async (req, res, next) => {
    const { id } = req.params
    try {
      const response = await User.findByPk(id)
      if (response) {
        endpointResponse({
          res,
          message: 'User retrieved successfully',
          body: response,
        })
      } else {
        throw new ErrorObject("Can't find the user you're looking for", 400);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  deleteUser: catchAsync(async (req, res, next) => {
    const { id } = req.params
    try {
      await User.destroy({
        where: {
          id: id
        }
      })
      const response = await User.findByPk(id, { paranoid: false })
      endpointResponse({
        res,
        message: 'User deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  create: catchAsync(async(req,res,next)=>{
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        avatar,
        roleId,
        deletedAt,
      } = req.body;
      const hashPasword = bcrypt.hashSync(password, 8);


      

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          email,
          password: hashPasword,
          avatar,
          roleId,
          deletedAt,
        },
      });
      //verificar si ya existe el usuario
      if (!created) {
        throw new ErrorObject("Email already exist", 400);
      } else {
        const token = await generateJwt(user.id);
        endpointResponse({
          res,
          message: "User created successfully",
          body: { user, token },
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - POST]: ${error.message}`
      );
      next(httpError);
      // res.status(error.statusCode).send(error.message)
    }
  }),
  editUser:catchAsync(
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user === null) throw new ErrorObject("user does not exist", 404);
        const {
          firstName,
          lastName,
          email,
          password,
          avatar,
          roleId,
          deletedAt,
        } = req.body;
        user.set({
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(password, 8),
          avatar,
          roleId,
          deletedAt,
        });
        const response = await user.save();
        endpointResponse({
          res,
          message: `${response.email} updated succesfully`,
          body: response,
        });
        
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error retrieving users] - [index - PUT]: ${error.message}`
        );
        next(httpError);
      }
    }
  ) 
};
