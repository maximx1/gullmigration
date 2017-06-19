var MigrationMath = require("../utils/migrationMath.js");
var BailCheck = require("../utils/bailCheck.js");
var evolveUp = require("./evolveUp");
var connectMongo = require("./mongo.js");
var Promise = require('bluebird');

module.exports = function(mongoUrl, migrationObj, callback) {
  BailCheck.validateConfig(migrationObj);
  connectMongo(mongoUrl).then(function(db) {
    console.log("you know where I am..... Fuck");
    return db.collection("gullmigrationMeta").findOne({});
  }).then(function(dbMeta) {
    if(dbMeta) {
      console.log("Migration metadata found, analyzing");
      BailCheck.validateDBMeta(dbMeta, migrationObj);
      var migrationSteps = MigrationMath.determineMigrationVersions(dbMeta.currentVersion, migrationObj.currentVersion);
      if(dbMeta.currentVersion < migrationObj.currentVersion) {
        console.log("Old migration data found, upgrading");
        evolveUp(mongoUrl, migrationSteps, migrationObj).then(function() {
          console.log("db upgraded");
          callback();
        }).error(function(err) {
          throw err;
        });
      } else if(dbMeta.currentVersion > migrationObj.currentVersion) {
        console.log("Migration data newer then requested version, downgrading");
        evolveDown(mongoUrl, migrationSteps, migrationObj).then(function() {
          console.log("db upgraded");
          callback();
        }).error(function(err) {
          throw err;
        });
      } else {
        console.log("db evolution is already at latest version");
        callback();
      }
    } else {
      console.log("No migration data found, initializing db");
      var migrationSteps = MigrationMath.determineMigrationVersions(-1, migrationObj.currentVersion);
      evolveUp(mongoUrl, migrationSteps, migrationObj).then(function() {
        console.log("db upgraded");
        callback();
      }).error(function(err) {
        throw err;
      });
    }
  }).error(function(err) {
    throw err;
  });
};
