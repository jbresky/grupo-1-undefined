'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      User.hasMany(models.Transaction,{foreignKey: "userId" }  )
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    roleId: {type:DataTypes.INTEGER, defaultValue:1},
    /* deletedAt: {
      type: DataTypes.STRING
    }, */
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'User',
  });
  return User;
};