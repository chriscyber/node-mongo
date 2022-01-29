// CRUD ops

exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection); // get access to a particular collection(string)
  return coll.insertOne(document); // return returns value as the default promise value
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
