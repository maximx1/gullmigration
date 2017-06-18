module.exports = {
  determineMigrationVersions: function(existingVersion, targetVersion) {
    migrationSteps = [];
    if(existingVersion < targetVersion) {
      for(var i = existingVersion + 1; i <= targetVersion; i++) {
        migrationSteps.push(i);
      }
    } else if(existingVersion > targetVersion) {
      for(var j = existingVersion; j > targetVersion; j--) {
        migrationSteps.push(j);
      }
    }
    return migrationSteps;
  }
};
