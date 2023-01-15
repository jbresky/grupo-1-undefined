const { Op } = require('sequelize');
const { User, Role } = require('../database/models')
const bcrypt = require("bcryptjs")

const getByEmail = async (email) => {
    return await User.findOne({
        paranoid: false,
        where: { email: email },
        // include: [{ model: Role }]
    }, { attributes: { exclude: ['password'] } });
}

const pwdCompare = async (password, hashed) => {
    return await bcrypt.compare(password, hashed)
}

module.exports = {
    getByEmail,
    pwdCompare
}