module.exports = {
  validateConfig: function(migrationObj) {
    if(migrationObj.currentVersion > migrationObj.evolutionUps.length - 1 ||
        migrationObj.evolutionUps.length !== migrationObj.evolutionDowns.length) {
      console.log("Migration configuration counts and versions don't match");
      process.exit(1);
    }
  },
  validateDBMeta: function(dbMeta, migrationObj) {
    if(doc.currentVersion < 0 || doc.currentVersion > migrationObj.currentVersion) {
      console.log("Database version is out of range of migration configuration");
      process.exit(1);
    }
  }
}
