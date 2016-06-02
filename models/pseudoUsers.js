'use strict';

module.exports = function(sequelize, DataTypes) {
  var pseudoUser = sequelize.define('pseudoUsers', {
    email: {
        type: DataTypes.STRING,
        unique: true,
      },
    emailVerification: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN
  });
  return pseudoUser;
};
