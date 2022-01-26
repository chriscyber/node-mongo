const MongoClient = require('mongodb').MongoClient; //driver that creates interface entre db and application
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/'; //connection to mongo server. port on which server is running
const dbname = 'nucampsite'; //db to connect to

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null); //actual, expected. if they're not ===, assert fails, logs error, and terminates 
  console.log('Connected correctly to mongodb server');
  
  const db = client.db(dbname);

  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null);
    console.log('Dropped Collection', result);

    const collection = db.collection('campsites');

    collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
    (err, result) => {
      assert.strictEqual(err, null);
      console.log('Insert Document:', result.ops);

      collection.find().toArray((err, docs) => { //to an array so can console.log results
        assert.strictEqual(err, null);
        console.log('Found Documents:', docs);

        client.close(); //closes connection from server
      })
    })
  })
});