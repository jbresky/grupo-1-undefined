const createHttpError = require("http-errors");
const { Category } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error.js");

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Category.findAll();
      endpointResponse({
        res,
        message: "Categories retrieved successfully",
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
  createCategory: catchAsync(async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const [category, created] = await Category.findOrCreate({
        where: { name },
        defaults: { 
          name,
          description
        }
      });
      if (!created) {
        throw new ErrorObject("Category already exist", 400);
      } else {
        endpointResponse({
          res,
          message: "Categories retrieved successfully",
          body: category,
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  })
}