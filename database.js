const mongo = require('mongodb').MongoClient;

var state = {
    db: null
};

var database = {};


database.connect = function(url, done) {
  if (state.db) return done();

  mongo.connect(url, function(err, db) {
    if (err) return done(err);
    state.db = db;
    done();
  });
};


database.get = function() {
  return state.db;
}

database.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};

module.exports = database;