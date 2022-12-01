const createHttpError = require('http-errors')
const {
  Transaction
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
        `[Error retrieving transactions] - [index - GET]: ${error.message}`,
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
          `[Error retrieving transaction] - [index - GET]: id not found`,
        )
        next(httpError);
        return;
      }
      endpointResponse({
        res,
        message: 'Transaction retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}