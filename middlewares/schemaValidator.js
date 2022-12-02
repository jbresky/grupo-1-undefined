const { checkSchema } = require("express-validator");
const { validator } = require("../helpers/validator");

const schemaValidator = (schema) => [
  checkSchema(schema),
  async (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = schemaValidator