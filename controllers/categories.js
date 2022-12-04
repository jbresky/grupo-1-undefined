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
  deleteCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await Category.findByPk(id);
      if (response) {
        await Category.destroy({
          where: {
            id: id
          }
        })
        endpointResponse({
          res,
          message: 'Category deleted successfully',
          body: response,
        })
      }else {
        throw new ErrorObject("Can't find the category you're looking for", 400);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting category] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  })
}