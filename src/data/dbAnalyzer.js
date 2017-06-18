var callMongo = require("./mongo.js");

module.exports = function(mongoUrl, migrationObj) {
  return callMongo(mongoUrl, function(db) {
    var result = db.collection("gullmigrationMeta").findOneAsync({});
    console.log(JSON.stringify(result));
    return result;
  });
};
