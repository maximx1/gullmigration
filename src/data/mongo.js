//var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mongotest';

module.exports = function(mongoUrl, callback) {
  require('mongodb').MongoClient.connect(mongoUrl, function(err, db) {
    callback(db);
    db.close();
  });
};
