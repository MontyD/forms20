'use strict';

module.exports = function(sequelize, DataTypes) {
  var formTheme = sequelize.define('formTheme', {
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    description: DataTypes.TEXT,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING
  });
  return formTheme;
};
