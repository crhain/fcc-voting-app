const db = require('./database.js');

//add hash, authenticate, and other user related functions and database calls
exports.update = function(profile, cb){
    let collection = db.get().collection('users');
    collection.findAndModify( 
                {id: profile.id},
                {},
                {$setOnInsert:{
                    id: profile.id,
                    name: profile.displayName || 'John Doe',
                    photo: profile.photos ? profile.photos[0].value : '',
                    email: profile.emails ? profile.emails[0].value : 'No public email',
                    created_on: new Date(),
                    provider: profile.provider || ''
                },$set:{
                    last_login: new Date()
                },$inc:{
                    login_count: 1
                }},
                {upsert:true, new: true},
                (err, doc) => {
                    return cb(null, doc.value);
                }
    );
}

exports.getUser = function(id, done){
    let collection = db.get().collection('users');
    collection.findOne(
                {id: id},
                (err, doc) => {
                    done(null, doc);
                }
            );
}            
