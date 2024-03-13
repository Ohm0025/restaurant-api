const { sequelize } = require("./src/models");
sequelize.sync({ alter: true });
