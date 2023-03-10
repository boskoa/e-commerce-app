const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Product_Category extends Model {}

Product_Category.init(
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
    categoryId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Product_Category };
