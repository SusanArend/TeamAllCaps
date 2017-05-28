module.exports = function(sequelize, DataTypes) {
  var employ_badge = sequelize.define("employ_badge", {
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    badgeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badgeurl: {
      type: DataTypes.STRING,
      allowNull: false
    }
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return employ_badge;
};
