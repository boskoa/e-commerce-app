const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "order",
  }
);

module.exports = { Order };
