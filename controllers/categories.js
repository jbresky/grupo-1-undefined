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
          message: "Category created successfully",
          body: category,
        });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating category] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getId: catchAsync(async (req, res, next) => {
    const { id } = req.params
    try {
      const response = await Category.findByPk(id)
      if (response) {
        endpointResponse({
          res,
          message: 'Category retrieved successfully',
          body: response,
        })
      } else {
        throw new ErrorObject("Can't find the category you're looking for", 400);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [index - GET]: ${error.message}`,
      )
      next(httpError)
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
