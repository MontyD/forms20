'use strict';

module.exports = function(sequelize, DataTypes) {
  var temporaryForm = sequelize.define('temporaryForms', {
    saveReference: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING,
    fields: DataTypes.JSON,
    style: DataTypes.JSON,
    config: DataTypes.JSON,
  });
  return temporaryForm;
};
