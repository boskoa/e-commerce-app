const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");

class Announcement extends Model {}

Announcement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "announcement",
  }
);

module.exports = { Announcement };
