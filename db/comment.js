var ObjectID = require('mongodb').ObjectID;

exports.insertComment = function(db, params, callbackSuccess, callbackFail) {
    var date  = new Date();
    var hour  = date.getHours();
    var min   = date.getMinutes();
    var sec   = date.getSeconds();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();

    db.collection('comment').insertOne({
        _id       : (new ObjectID()).toString(),
        user      : params.user,
        type      : params.type,
        name      : params.name,
        image     : params.image,
        tourId    : params.tourId,
        comment   : params.comment,
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
};

exports.findComment = function(db, params, callbackSuccess, callbackFail) {
    db.collection('comment').find({ tourId: params.tourId }).sort({date: 1, time: 1}).toArray(function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                commentList   : doc
            }
        });
    });
};
