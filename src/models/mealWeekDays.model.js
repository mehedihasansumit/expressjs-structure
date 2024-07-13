// const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("meal_weekdays", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM('SATERDAY', 'SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY'),
      allowNull: false
    }
  });
  return User;
};