'use strict';

module.exports = function(sequelize, DataTypes) {
  var pseudoUser = sequelize.define('pseudoUsers', {
    email: DataTypes.STRING,
    emailVerification: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN
  });
  return pseudoUser;
};
