var callMongo = require("./mongo.js");

module.exports = function(mongoUrl, migrationSteps, migrationObj) {
  callMongo(mongoUrl, function(db) {
    return db.collection("gullmigrationMeta").remove({});
  });
  callMongo(mongoUrl, function(db) {
    return db.collection("gullmigrationMeta").insertAsync({currentVersion: migrationObj.currentVersion});
  });

  console.log(JSON.stringify(migrationSteps));

  migrationSteps.forEach(function(migrationStep) {
    var evolutionUp = migrationObj.evolutionUps[migrationStep];

    if(evolutionUp.addToCollection) {
      collectionsToAddTo = Object.keys(evolutionUp.addToCollection);
      collectionsToAddTo.forEach(function(collectionToAddTo) {
        callMongo(mongoUrl, function(db) {
          return db.collection(collectionToAddTo).insertAsync(evolutionUp.addToCollection[collectionToAddTo]);
        });
      });
    }

    if(evolutionUp.fieldChanges) {
      collectionsToModifyFields = Object.keys(evolutionUp.fieldChanges);
      collectionsToModifyFields.forEach(function(collectionToModifyFields) {
        callMongo(mongoUrl, function(db) {
          return db.collection(collectionToModifyFields).updateManyAsync(
            { },
            { $rename: evolutionUp.fieldChanges[collectionToModifyFields] }
          );
        });
      });
    }
  });
}
