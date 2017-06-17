var mongo = require("./mongo.js");

module.exports = {
  currentVersion: 1,

  migrationUpgrade: [
    {
      index: 0,
      initializeCollection: {
        users: [{
          name: process.env.ADMIN_USERNAME || "roger",
          password: process.env.ADMIN_PASS || "roger"
        }]
      }
    },
    {
      index: 1,
      fieldChanges: {
        users: [ {name: "username"} ]
      }
    }
  ],

  migrationDowngrade: [
    {
      index: 0,
      deleteCollections: [ "users" ]
    },
    {
      index: 1,
      fieldChanges: {
        users: [ { username: "name"} ]
      }
    }
  ]
};
