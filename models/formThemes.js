'use strict';

module.exports = function(sequelize, DataTypes) {
  var formTheme = sequelize.define('formThemes', {
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    description: DataTypes.TEXT,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING
  });
  return formTheme;
};
