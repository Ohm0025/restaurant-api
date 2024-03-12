module.exports = (sequelize, DataTypes) => {
  const FoodIngredient = sequelize.define("FoodIngredient", {
    volume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    howToUseIt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  FoodIngredient.associate = (db) => {
    FoodIngredient.hasOne(db.Food, {
      foreignKey: {
        name: "foodId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    FoodIngredient.hasOne(db.Ingredient, {
      foreignKey: {
        name: "ingredientId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return FoodIngredient;
};
