var connectMongo = require("./mongo.js");
var Promise = require('bluebird');

var handleAddToCollection = function(db, evolution) {
  return Promise.map(Object.keys(evolution.addToCollection || {}), function(collectionToAddTo) {
    console.log("Adding to collection");
    return db.collection(collectionToAddTo).insert(evolution.addToCollection[collectionToAddTo]);
  });
};

var handleModifyField = function(db, evolution) {
  return Promise.map(Object.keys(evolution.fieldChanges || {}), function(collectionToModifyFields) {
    console.log("Modifying fields");
    return db.collection(collectionToModifyFields).updateMany(
      { },
      { $rename: evolution.fieldChanges[collectionToModifyFields] }
    );
  });
};

var handleUp = function(db, evolutionUp) {
  return handleAddToCollection(db, evolutionUp).then(function() {
    return handleModifyField(db, evolutionUp);
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
