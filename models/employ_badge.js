module.exports = function(sequelize, DataTypes) {
  var employ_badge = sequelize.define("employ_badge", {
    give_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employ_basics",
        key: "id"
      }
    },
    receive_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employ_basics",
        key: "id"
      }
    },
    badge1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge4: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge5: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge6: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT
    }
  });
  return employ_badge;
};

