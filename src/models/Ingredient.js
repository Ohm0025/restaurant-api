module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Ingredient.associate = (db) => {
    Ingredient.hasMany(db.FoodIngredient, {
      foreignKey: {
        name: "ingredientId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Ingredient;
};
