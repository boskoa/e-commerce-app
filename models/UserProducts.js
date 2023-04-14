const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class User_Product extends Model {}

User_Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    selfGranted: DataTypes.BOOLEAN,
    productId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { User_Product };
