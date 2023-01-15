'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { as: 'user',
        foreignKey: 'userId'
      });
      Transaction.belongsTo(models.User, { as: 'toUser',
        foreignKey: 'toUserId'
      });
      Transaction.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      });
    }

  };
  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM(["Ingreso", "Egreso"]),
    },
    description: DataTypes.STRING,
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    toUserId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    categoryId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Transaction',
  });
  return Transaction;
};
