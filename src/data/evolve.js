var analyzeDb = require("./dbAnalyzer.js");
var MigrationMath = require("../utils/migrationMath.js");
var BailCheck = require("../utils/bailCheck.js");
var evolveUp = require("./evolveUp");
//var evolveDown = require("./evolveDown");

module.exports = function(mongoUrl, migrationObj, callback) {
  BailCheck.validateConfig(migrationObj);
  var dbMeta = analyzeDb(mongoUrl, migrationObj);
  // console.log("meta:" + dbMeta.currentVersion);
  // console.log("obj:" + migrationObj.currentVersion);
  if(dbMeta) {
    console.log("Migration data found, migrating mongo");
    BailCheck.validateDBMeta(dbMeta, migrationObj);
    var migrationSteps = MigrationMath.determineMigrationVersions(dbMeta.currentVersion, migrationObj.currentVersion);
    if(dbMeta.currentVersion < migrationObj.currentVersion) {
      evolveUp(mongoUrl, migrationSteps, migrationObj);
    } else if(dbMeta.currentVersion > migrationObj.currentVersion) {
      evolveDown(mongoUrl, migrationSteps, migrationObj);
    } else {
      console.log("Mongo is already at latest version");
    }
  } else {
    console.log("No migration data found, initializing");
    var migrationSteps = MigrationMath.determineMigrationVersions(-1, migrationObj.currentVersion);
    evolveUp(mongoUrl, migrationSteps, migrationObj);
  }
};
