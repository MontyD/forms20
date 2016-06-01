'use strict';

module.exports = function(sequelize, DataTypes) {
  var pseudoUser = sequelize.define('pseudoUsers', {
    email: DataTypes.STRING,
    emailVerification: DataTypes.STRING,
    description: DataTypes.TEXT,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING
  });
  return pseudoUser;
};
