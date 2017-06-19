var connectMongo = require("./mongo.js");
var Promise = require('bluebird');

var handleUp = function(db, evolutionUp) {
  return Promise.map(Object.keys(evolutionUp.addToCollection || {}), function(collectionToAddTo) {
    console.log("Adding to collection");
    return db.collection(collectionToAddTo).insert(evolutionUp.addToCollection[collectionToAddTo]);
  }).then(function() {
    return Promise.map(Object.keys(evolutionUp.fieldChanges || {}), function(collectionToModifyFields) {
        console.log("field changes");
        return db.collection(collectionToModifyFields).updateMany(
          { },
          { $rename: evolutionUp.fieldChanges[collectionToModifyFields] }
        );
      })
  });
};

module.exports = function(mongoUrl, migrationSteps, migrationObj) {
  return connectMongo(mongoUrl).then(function(db) {
    console.log("cleaned old meta data");
    return db.collection("gullmigrationMeta").remove({}).then(function() {
      console.log("Updated meta data");
      return db.collection("gullmigrationMeta").insert({currentVersion: migrationObj.currentVersion}).then(function() {
        return Promise.map(migrationSteps, function(migrationStep) {
          return handleUp(db, migrationObj.evolutionUps[migrationStep]);
        }).reduce(function(prev, cur) {
          return prev.concat(cur);
        }, []);
      });
    });
  });
};
