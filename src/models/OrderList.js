module.exports = (sequelize, DataTypes) => {
  const OrderList = sequelize.define("OrderList", {
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  OrderList.associate = (db) => {
    OrderList.hasOne(db.FoodOrder, {
      foreignKey: {
        name: "foodOrderId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    OrderList.hasOne(db.Food, {
      foreignKey: {
        name: "foodId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return OrderList;
};
