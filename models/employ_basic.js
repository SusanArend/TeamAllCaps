// table employ_basics schema
// Columns: id (primary key), name (first and last name), 
// email(email adress, set as unique), phone(phone number),
// linkedin_url, title(position in the company),manager_id(manager index for this employee)
// Foreign key relationship established between id and manager_id, foreign key: manager_id, 
// reference: id

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
      type: DataTypes.STRING,
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
    },
    photo_path: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return employ_basic;
};

