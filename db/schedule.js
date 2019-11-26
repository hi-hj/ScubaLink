var ObjectID = require('mongodb').ObjectID;

exports.updateSchedule = function(db, params, callbackSuccess, callbackFail) {
    db.collection('schedule').findOne({ id: params.id, tourid: params.tourId }, function(err, doc) {
        if (err) throw err;

        var date  = new Date();
        var hour  = date.getHours();
        var min   = date.getMinutes();
        var sec   = date.getSeconds();
        var year  = date.getFullYear();
        var month = date.getMonth() + 1;
        var day   = date.getDate();

        if(doc == null) {
            db.collection('schedule').insertOne({
                _id         : (new ObjectID()).toString(),
                id          : params.id,
                tourid      : params.tourId,
                type        : params.type,
                date        : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
                time        : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec
            }, function(err, res) {
                if (err) throw err;

                callbackSuccess({
                    code    : "0000",
                    message : "Success",
                    result  : {
                        tourId    : res.insertedId
                    }
                });
            });
        }
        else {
            db.collection('schedule').remove({ id: params.id, tourid: params.tourId }, function(err, res) {
                if (err) throw err;

                db.collection('schedule').insertOne({
                    _id         : (new ObjectID()).toString(),
                    id          : params.id,
                    tourid      : params.tourId,
                    type        : params.type,
                    date        : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
                    time        : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec
                }, function(err, res) {
                    if (err) throw err;

                    callbackSuccess({
                        code    : "0000",
                        message : "Success",
                        result  : {
                            tourId    : res.insertedId
                        }
                    });
                });
            });
        }
    });
};
