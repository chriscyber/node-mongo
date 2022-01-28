const MongoClient = require("mongodb").MongoClient; //driver that creates interface entre db and application
const assert = require("assert").strict;
const dboper = require("./operations");

const url = "mongodb://localhost:27017/"; //connection to mongo server. port on which server is running
const dbname = "nucampsite"; //db to connect to

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null); //actual, expected. if they're not ===, assert fails, logs error, and terminates
  console.log("Connected correctly to mongodb server");

  const db = client.db(dbname);

  //dbname.campsite.insertOne({ name: "temp" });

  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection", result);

    dboper.insertDocument(
      db,
      { name: "Breadcrumb Trail Campground", description: "Test" },
      "campsites",
      (result) => {
        console.log("Insert Document:", result.ops); //this inline callback definiton will remember callback result later.

        dboper.findDocuments(db, "campsites", (docs) => {
          console.log("Found Documents:", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsites",
            (result) => {
              console.log("Updated Doc Count:", result.result.nModified);

              dboper.findDocuments(db, "campsites", (docs) => {
                console.log("Found Docs:", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted Doc Count:", result.deletedCount);
                    client.close(); //closes connection from server
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
