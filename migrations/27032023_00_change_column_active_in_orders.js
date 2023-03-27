const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("orders", "status", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("orders", "status", {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    });
  },
};
