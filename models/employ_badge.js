module.exports = function(sequelize, DataTypes) {
  var employ_badge = sequelize.define("employ_badge", {
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employ_basics",
        key: "id"
      }
    },
    recipient_id: { 
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
      defaultValue: 0
    },
    badge2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    badge3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    badge4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    badge5: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    badge6: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return employ_badge;
};

