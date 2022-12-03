const { User } = require("../database/models");
const { ErrorObject } = require("../helpers/error.js");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/generate-JWT.js");

const getUsers = async () => {
    try {
        const users = await User.findAll();
        if (!users) {
            throw new ErrorObject("No users found", 404)
        }
        return users
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

const getOneUser = async (id) => {
    try {
        const user = await User.findByPk(id)
        if (!user) {
            throw new ErrorObject("No user found", 404)
        }
        return user
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

const createUser = async (condition, body) => {
    try {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const [user, created] = await User.findOrCreate({
            where: condition,
            defaults: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword,
                avatar: body.avatar,
                roleId: body.roleId,
            },
        });
        //verificar si ya existe el usuario
        if (!created) {
            throw new ErrorObject("Email already exist", 400);
        } else {
            const token = await generateJwt(user.id);
            return {
                user, token
            }
        }
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

const checkUser = async (condition) => {
    try {
        const user = await User.findOne({
            where: condition
        })
        if (!user) throw new ErrorObject("User does not exists", 404)
        return true
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

const updateUser = async (id, body) => {
    try {
        const userExist = await checkUser(id);
        if (!userExist) {
            return null
        }
        User.update(body, {
            where: id,
        });
        return body
    } catch (err) {
        throw new ErrorObject(err.message, 500, err);
    }
}


module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser
}