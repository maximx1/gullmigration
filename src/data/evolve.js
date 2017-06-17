var analyzeDb = require("./dbAnalyzer.js");

var determineMigrationVersions = function(existingVersion, targetVersion) {
  migrationSteps = [];
  if(existingVersion === targetVersion) {
    cosole.log("Mongo is already at latest version");
  } else if(existingVersion < targetVersion) {
    for(var i = existingVersion + 1; i < targetVersion; i++) {
      migrationSteps.push(i);
    }
  } else {
    for(var j = existingVersion; j > targetVersion; j--) {
      migrationSteps.push(j);
    }
  }
  return migrationSteps;
};

module.exports = function(mongoUrl, migrationObj, callback) {
  analyzeDb(mongoUrl, migrationObj, function(migrationMeta) {
    if(doc) {
      console.log("Migration data found, migrating mongo");
    } else {
      console.log("No migration data found, initializing");
    }
  });
};
