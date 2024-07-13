// const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define("foodItems", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
  });
  return FoodItem;
};