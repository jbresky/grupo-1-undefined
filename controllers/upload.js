const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { extname } = require('path')
const multer = require("multer");
const allowedFileTypes = ["image/png", "image/jpg", "image/svg", "image/webp"];

module.exports = {
  upload : multer({
    storage: multer.diskStorage({
      destination: 'uploads',
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}-${Date.now()}${fileExtension}`)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Only ${allowedFileTypes.join(" ")} mimetypes are allowed`));
      }
    },
  }),
  uploadFile: catchAsync(async (req, res, next) => {
    try {
      return endpointResponse({
        res,
        message: `File uploaded succesfully`,
        body: { status: 'OK' },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error uploading files] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }
  })
}