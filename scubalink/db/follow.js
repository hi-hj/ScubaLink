var ObjectID = require('mongodb').ObjectID;

exports.addFollow = function(db, params, callbackSuccess, callbackFail) {
    db.collection('follow').findOne({ ins: params.ins, bgn: params.bgn }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            var date  = new Date();
            var hour  = date.getHours();
            var min   = date.getMinutes();
            var sec   = date.getSeconds();
            var year  = date.getFullYear();
            var month = date.getMonth() + 1;
            var day   = date.getDate();

            db.collection('follow').insertOne({
                _id       : (new ObjectID()).toString(),
                ins       : params.ins,
                bgn       : params.bgn,
                date      : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
                time      : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec
            }, function(err, res) {
                if (err) throw err;

                callbackSuccess({
                    code    : "0000",
                    message : "Success",
                    result  : {}
                });
            });
        }
        else {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });

        }
    });
};

exports.removeFollow = function(db, params, callbackSuccess, callbackFail) {
    db.collection('follow').findOne({ ins: params.ins, bgn: params.bgn }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            db.collection('follow').remove({ ins : params.ins, bgn : params.bgn }, function(err, res) {
                if (err) throw err;

                callbackSuccess({
                    code    : "0000",
                    message : "Success",
                    result  : {}
                });
            });
        }
    });
};


exports.findFollowers = function(db, params, callbackSuccess, callbackFail) {
    db.collection('follow').aggregate(
        [{
            $match: {
                ins: params.id
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "bgn",
                foreignField  : "id",
                as            : "bgn"
            }
        }, {
            $unwind   : "$bgn"
        }, {
            $project: {
                item        : 1,
                id          : "$bgn.id",
                name        : "$bgn.name",
                image       : "$bgn.image"
            }
        }]
    ).sort({name: -1}).toArray(function(err, doc) {
        if (err) throw err;

        console.log(doc);

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                followerList   : doc
            }
        });
    });
};
