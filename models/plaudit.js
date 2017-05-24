module.exports = function(sequelize, DataTypes) {
  var Plaudit = sequelize.define("Plaudit", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      // defaultValue: "Personal"
    }
  });
  return Plaudit;
};
