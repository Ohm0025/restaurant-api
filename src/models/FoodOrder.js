module.exports = (sequelize, DataTypes) => {
  const FoodOrder = sequelize.define("FoodOrder", {
    allTotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("unfinish", "finish"),
      allowNull: false,
    },
  });
  FoodOrder.associate = (db) => {
    FoodOrder.hasOne(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return FoodOrder;
};
