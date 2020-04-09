var ObjectID    = require('mongodb').ObjectID;

exports.insertExchangerate = function(db, params) {
    db.collection('exchangerate').updateOne({
        name: params.name
    }, {
        $set: {
            name: params.name.substr(0, 3),
            timestamp: params.timestamp * 1000,
            rate: params.rate
        }
    }, {
        upsert: true,
        safe: false
    }, function (err, doc) {
        //
    });
};

exports.findExchangerate = function(db, callbackSuccess) {
    db.collection('exchangerate').find({}).toArray(function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                exchangerateList: doc
            }
        });
    });
};