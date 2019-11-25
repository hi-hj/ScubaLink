var ObjectID = require('mongodb').ObjectID;

exports.addCertification = function(db, params, callbackSuccess, callbackFail) {
    db.collection('certification').findOne({ id: params.id, issuedate: params.issuedate, issuegroup: params.issuegroup, course: params.course, special: params.special }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            var date  = new Date();
            var hour  = date.getHours();
            var min   = date.getMinutes();
            var sec   = date.getSeconds();
            var year  = date.getFullYear();
            var month = date.getMonth() + 1;
            var day   = date.getDate();

            db.collection('certification').insertOne({
                _id         : (new ObjectID()).toString(),
                id          : params.id,
                issuedate   : params.issuedate,
                issuegroup  : params.issuegroup,
                course      : params.course,
                special     : params.special,
                image       : params.image,
                date        : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
                time        : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec
            }, function(err, res) {
                if (err) throw err;

                callbackSuccess({
                    code    : "0000",
                    message : "Success",
                    result  : {
                        certId    : res.insertedId
                    }
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

exports.updateCertification = function(db, params, callbackSuccess) {
    var updateData = {};

    if( params.issuedate != undefined )
        updateData.issuedate = params.issuedate;
    if( params.issuegroup != undefined )
        updateData.issuegroup = params.issuegroup;
    if( params.course != undefined )
        updateData.course = params.course;
    if( params.special != undefined )
        updateData.special = params.special;
    if( params.image != undefined )
        updateData.image = params.image;

    db.collection('certification').updateOne({
        _id   : params.certId
    }, {
        $set: updateData
    }, function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {

            }
        });
    });
};

exports.removeCertification = function(db, params, callbackSuccess, callbackFail) {
    db.collection('certification').findOne({ _id: params.certId }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            db.collection('certification').remove({ _id: params.certId }, function(err, res) {
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

exports.findCertifications = function(db, params, callbackSuccess, callbackFail) {
    db.collection('certification').find({ id: params.id }).sort({date: -1, time: -1}).toArray(function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                certList   : doc
            }
        });
    });
};

exports.findCertificationDetail = function(db, params, callbackSuccess, callbackFail) {
    db.collection('certification').findOne({ _id: params.id }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            callbackSuccess({
                code    : "0000",
                message : "Success",
                result  : doc
            });
        }
    });
};
