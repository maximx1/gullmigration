var evolutionizer = require("./src/data/evolve.js");
var sampleMongoMigrationObj = require("./samples/mongoMigration.js");

evolutionizer('mongodb://localhost:27017/mongotest', sampleMongoMigrationObj, function() {
  console.log("Migration completed");
  process.exit(0);
});
