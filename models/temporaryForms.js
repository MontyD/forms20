'use strict';

module.exports = function(sequelize, DataTypes) {
  var temporaryForm = sequelize.define('temporaryForms', {
    hash: DataTypes.STRING,
    name: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING,
    fields: DataTypes.JSON,
    style: DataTypes.STRING
  });
  return temporaryForm;
};
