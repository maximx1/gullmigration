//var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mongotest';

var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

module.exports = function(mongoUrl, callback) {
  mongoClient.connectAsync(mongoUrl).then(function(db) {
    var result = callback(db);
    db.close();
    return result;
  }).catch(function(err) {
    throw err;
  });
};
