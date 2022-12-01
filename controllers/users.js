const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {ErrorObject} = require('../helpers/error.js')
const bcrypt = require('bcryptjs')

const {generateJwt} = require('../helpers/generate-JWT.js')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll()
      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  create: catchAsync(async(req,res,next)=>{
    try {
      const {firstName,lastName,email,password,avatar,roleId,deletedAt} = req.body
      const hashPasword = bcrypt.hashSync(password,8)
      const [user,created] = await User.findOrCreate({
        where: {email},
        defaults: {
          firstName,
          lastName,
          email,
          password:hashPasword,
          avatar,
          roleId,
          deletedAt,
        }});
      //verificar si ya existe el usuario
      if(!created){
        const error = new ErrorObject("Email already exist", 400)
        throw error
      }else{
        const token = await generateJwt(user.id)
        console.log("token: ", token)
        endpointResponse({
          res,
          message: 'User created successfully',
          body:{user, token}
        })
      } 
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - POST]: ${error.message}`,
      )
      next(httpError)
    }
  })
}
