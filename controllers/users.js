const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error.js");
const { getUsers, getOneUser, createUser, updateUser } = require('../services/users')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getUsers();
      endpointResponse({
        res,
        message: 'User retrieved successfully',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }}),

  getId: catchAsync(async (req, res, next) => {
    const { id } = req.params
    try {
      const response = await getOneUser(id)
      endpointResponse({
        res,
        message: 'User retrieved successfully',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }}),

  create: catchAsync(async (req, res, next) => {
    try {
      const { user, created } = await createUser({ email: req.body.email }, ...req.body);
      if (!created) {
        throw new ErrorObject("Email already exists", 403);
      } else {
        endpointResponse({
          res,
          message: "The user has been created",
          body: { user, token },
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }}),
    
  editUser: catchAsync(async (req, res, next) => {
    try {
      const userUpdated = updateUser({ id: req.user.id }, ...req.body)
      if (!userUpdated) {
        throw new ErrorObject("User do not exists", 403);
      } else {
        endpointResponse({
          res,
          message: "The user has been updated",
          body: userUpdated,
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }})
};
