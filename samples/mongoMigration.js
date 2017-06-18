module.exports = {
  currentVersion: 1,

  evolutionUps: [
    {
      index: 0,
      addToCollection: {
        users: [{
          name: process.env.ADMIN_USERNAME || "roger",
          password: process.env.ADMIN_PASS || "roger"
        }]
      }
    },
    {
      index: 1,
      fieldChanges: {
        users: { name: "username" }
      }
    }
  ],

  evolutionDowns: [
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
