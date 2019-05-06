'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubLocation = sequelize.define('SubLocation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    maleCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: {
          args: true,
          msg: "male count cannot be empty"
        }
      }
    },
    femaleCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: {
          args: true,
          msg: "female count cannot be empty"
        }
      }
    }
  }, {});
  SubLocation.associate = function(models) {
    SubLocation.belongsTo(models.Location, {
      foreignKey: "locationId",
      onDelete: "CASCADE"
    })
  };
  return SubLocation;
};
