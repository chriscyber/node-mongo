const MongoClient = require("mongodb").MongoClient; //driver that creates interface entre db and application
const dboper = require("./operations");

const url = "mongodb://localhost:27017/"; //connection to mongo server. port on which server is running
const dbname = "nucampsite"; //db to connect to

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected correctly to mongodb server");

    const db = client.db(dbname);

    db.dropCollection("campsites")
      .then((result) => {
        console.log("Dropped Collection", result);
      })
      .catch((err) => console.log("No collection to drop."));

    dboper
      .insertDocument(
        db,
        { name: "Breadcrumb Trail Campground", description: "Test" },
        "campsites"
      )
      .then((result) => {
        console.log("Insert Document:", result.ops);

        return dboper.findDocuments(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents:", docs);

        return dboper.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "Updated Test Description" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Updated Doc Count:", result.result.nModified);

        return dboper.findDocuments(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Docs:", docs);

        return dboper.removeDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Deleted Doc Count:", result.deletedCount);
        return client.close(); //closes connection from server
      })
      .catch((err) => {
        console.log(err);
        client.close();
      });
  })
  .catch((err) => console.log(err));
