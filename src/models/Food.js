module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define("Food", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    picture: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    estimateTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    howToCook: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Food.associate = (db) => {
    Food.hasMany(db.OrderList, {
      foreignKey: {
        name: "foodId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Food;
};
