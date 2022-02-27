const db = require("../config/mongodb");
const {ObjectId} = require("mongodb");

const getMovieCollection = () =>{
    return db.getCollection("movies");
}

exports.returnAllMovie = (req, callback) =>{
    getMovieCollection().find({}).toArray()
        .then((data)=>{
            callback(data);
        })
}

exports.findByName = (name, callback) =>{
    getMovieCollection().findOne({name})
        .then((data)=>{
            callback(data);
            },
            (err)=> console.log(err)
        )
}


exports.topThreeRated = (req, callback) =>{
    getMovieCollection().find({}).sort({rating:-1}).limit(3).toArray()
        .then(data => callback(data));
}

exports.update = (model, cb) =>{
    const filter = {_id: ObjectId(model._id)};
    console.log(filter);

    const update = {$set: {name: model.name, genre : model.genre, rating: model.rating, language: model.language, achievements: model.achievements}};

    getMovieCollection().findOneAndUpdate(filter, update)
    .then(()=>{
        cb()
        },
        err=> {console.log(err)}
    )
}

exports.save = (model, cb) =>{
    getMovieCollection().insertOne({name: model.name, genre : model.genre, rating: model.rating, language: model.language, achievements: model.achievements})
    .then(()=>{
        cb();
    },
    err=>{throw new Error(err);})
}

exports.returnIfHaveAchievement = (req, cb) =>{
    getMovieCollection().find({ achievements :{ $exists: true, $type: 'array', $ne: [] }}).toArray()
        .then(data=> cb(data),
            err=> console.log(err));
}

exports.returnIfHaveBOTHAchievements = (req, cb) =>{
    getMovieCollection()//.find({ achievements :{ $exists: true, $type: 'array', $ne: [] }})
        .find({ $and: [ {achievements :{ $in: ['Super hit'] }}, {achievements :{ $in: ['Super Duper Hit'] }} ] })
    .toArray()
        .then(data=> cb(data),
            err=> console.log(err));
}