// table employ_options schema
// Columns: email (primary key), photo (binary string), 
// Favorite (anything fun we will define later)
// Foreign key relationship established between email and email in employ_basics table, foreign key: email, 
// reference: email from employ_basics table

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
    password: {
      type: DataTypes.Integer,
      allowNull: false,
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
