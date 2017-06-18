var connectMongo = require("./mongo.js");

module.exports = function(mongoUrl, migrationSteps, migrationObj) {
  connectMongo(mongoUrl).then(function(db) {
    return db.collection("gullmigrationMeta").remove({});
  }).catch(function(err) {
    throw err;
  });

  connectMongo(mongoUrl).then(function(db) {
    return db.collection("gullmigrationMeta").insert({currentVersion: migrationObj.currentVersion});
  }).catch(function(err) {
    throw err;
  });

  //console.log(JSON.stringify(migrationSteps));

  migrationSteps.forEach(function(migrationStep) {
    var evolutionUp = migrationObj.evolutionUps[migrationStep];

    if(evolutionUp.addToCollection) {
      collectionsToAddTo = Object.keys(evolutionUp.addToCollection);
      collectionsToAddTo.forEach(function(collectionToAddTo) {
        connectMongo(mongoUrl).then(function(db) {
          return db.collection(collectionToAddTo).insert(evolutionUp.addToCollection[collectionToAddTo]);
        }).catch(function(err) {
          throw err;
        });
      });
    }

    if(evolutionUp.fieldChanges) {
      collectionsToModifyFields = Object.keys(evolutionUp.fieldChanges);
      collectionsToModifyFields.forEach(function(collectionToModifyFields) {
        connectMongo(mongoUrl).then(function(db) {
          return db.collection(collectionToModifyFields).updateMany(
            { },
            { $rename: evolutionUp.fieldChanges[collectionToModifyFields] }
          );
        }).catch(function(err) {
          throw err;
        });
      });
    }
  });
};
