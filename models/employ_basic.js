module.exports = function(sequelize, DataTypes) {
  var employ_basic = sequelize.define("employ_basic", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    linkedin_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employ_basics",
        key: "id"
      }
    }
  });
  return employ_basic;
};

