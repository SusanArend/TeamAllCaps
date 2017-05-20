module.exports = function(sequelize, DataTypes) {
  var employ_option = sequelize.define("employ_option", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: "employ_basics",
        key: "email"
      }
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    favorite: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return employ_option;
};
