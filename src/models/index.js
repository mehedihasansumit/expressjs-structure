const { sequelize, Sequelize } = require("../services/db.service.js")

const testDbConnection = async () => {
    try {
        console.log({ dbConfig })
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
db.testDbConnection = testDbConnection;

db.User = require("./users.model.js")(sequelize, Sequelize.DataTypes);
db.FoodItem = require("./foodItems.model.js")(sequelize, Sequelize.DataTypes);
db.FoodCategory = require("./foodCategories.model.js")(sequelize, Sequelize.DataTypes);

module.exports = db;
