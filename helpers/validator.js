const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        errors: errors.array()
    });
}

module.exports = validator