var connectMongo = require("./mongo.js");

module.exports = function(mongoUrl, migrationObj) {
  connectMongo(mongoUrl).then(function(db) {
    return db.collection("gullmigrationMeta").findOne({});
  }).then(function(doc) {
    console.log(JSON.stringify(doc));
    return doc;
  }).catch(function(err) {
    throw err;
  });
};
