module.exports = function(mongoUrl) {
  return require('mongodb').MongoClient.connect(mongoUrl, { promiseLibrary: require('bluebird') });
};
