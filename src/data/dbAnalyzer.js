var callMongo = require("./mongo.js");

module.exports = function(mongoUrl, migrationObj, callback) {
  callMongo(mongoUrl, function(db) {
    db.collection("gullmigrationMeta").findOne({}, function(err, doc) {
      if(err) {
        console.log(err);
      }
      callback(doc);
    });
  });
};
