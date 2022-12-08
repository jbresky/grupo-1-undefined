const createHttpError = require('http-errors')
const {
  Transaction,
  User,
  Category,
} = require('../database/models')
const {
  endpointResponse
} = require('../helpers/success')
const {
  catchAsync
} = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  listAll: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll()
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions] - [listAll - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  listOne: catchAsync(async (req, res, next) => {
    try {
      const transactionId = req.params.id
      const response = await Transaction.findByPk(transactionId);
      if (!response) {
        const httpError = createHttpError(
          404,
          `[Error retrieving transaction] - [listOne - GET]:Id not found`,
        )
        next(httpError);
        return;
      }

      endpointResponse({
        res,
        message: 'Transaction retrieved successfully',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [listOne - GET]: ${error.message}`,
      )
      next(httpError);
    }
  }),
  create: catchAsync(async (req, res, next) => {
    try {
      const {
        description,
        amount,
        userId,
        categoryId,
        date
      } = req.body;

      const now = new Date();
      const user = await User.findByPk(userId);
      if (!user) {
        const httpError = createHttpError(
          404,
          `[Error creating transaction] - [create - POST]: User not found`,
        )
        next(httpError);

        return;
      }

      const category = await Category.findByPk(categoryId);
      if (!category) {
        const httpError = createHttpError(
          404,
          `[Error creating transaction] - [create - POST]: Category not found`,
        )
        next(httpError);

        return;
      }

      const response = await Transaction.create({
        amount: Number(amount),
        userId,
        categoryId,
        date,
        description,
        createdAt: now,
        updatedAt: now
      });
      endpointResponse({
        res,
        message: 'Transaction created successfully',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating transaction] - [create - POST]: ${error.message}`,
      )
      next(httpError);
    }
  }),
  edit: catchAsync(async (req, res, next) => {
    const { id } = req.params
    const transaction = await Transaction.findByPk(id);
    try {
      const {
        userId,
        categoryId,
      } = req.body;
// esto es necesario? o puedo crear un middleware?
      if (!transaction) {
        const httpError = createHttpError(
          404,
          `[Error editing transaction] - [edit - PUT]: Transaction not found`,
        )
        next(httpError);

        return;
      }

      if (userId) {
        const user = await User.findByPk(userId);
        if (!user) {
          const httpError = createHttpError(
            404,
            `[Error editing transaction] - [edit - PUT]: user not found`,
          )
          next(httpError);

          return;
        }
      }

      if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          const httpError = createHttpError(
            404,
            `[Error editing transaction] - [edit - PUT]: category not found`,
          )
          next(httpError);

          return;
        }
      }

      const now = new Date();
      const response = await transaction.update({
        ...req.body,
        ...(req.body.amount && {
          amount: Number(req.body.amount)
        }),
        updatedAt: now,
      });
      endpointResponse({
        res,
        message: 'Transaction edited successfully',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error editing transaction] - [edit - PUT]: ${error.message}`,
      )
      next(httpError);
    }
  }),
  delete: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        const httpError = createHttpError(
          404,
          `[Error deleting transaction] - [edit - DELETE]: Transaction not found`,
        )
        next(httpError);

        return;
      }

      const response = transaction.destroy();
      endpointResponse({
        res,
        message: 'Transaction deleted successfully',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting transaction] - [delete - DELETE]: ${error.message}`,
      )
      next(httpError);
    }
  })
}