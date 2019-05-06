'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
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
    }
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.SubLocation, {
      foreignKey: "locationId",
      as: "subLocations"
    })
  };
  return Location;
};
