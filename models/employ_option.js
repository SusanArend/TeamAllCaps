// table employ_options schema
// Columns: email (primary key), photo (binary string), 
// Favorite (anything fun we will define later)
// Foreign key relationship established between email and email in employ_basics table, foreign key: email, 
// reference: email from employ_basics table

module.exports = function(sequelize, DataTypes) {
  var employ_option = sequelize.define("employ_option", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      classMethods:{
        associate:function(models){
          employ_option.belongsTo(models.employ_basic, {foreignKey:{
            allowNull:false
          }
        });
      }
    }
  })
  return employ_option;
};
