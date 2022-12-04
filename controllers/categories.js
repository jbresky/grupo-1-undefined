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
        `[Error retrieving categories] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  editCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) throw new ErrorObject("Can't find the category you're looking for", 404);
    const { name, description } = req.body;
    try {
      category.set({
        name,
        description
      });
      const response = await category.save();
      endpointResponse({
        res,
        message: `${response.name} updated succesfully`,
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error editing category] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  })
}