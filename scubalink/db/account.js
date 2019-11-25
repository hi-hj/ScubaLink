
var ObjectID    = require('mongodb').ObjectID;

// type: 0 (준회원)
// type: 1 (강사)
// type: 2 (교육생)
exports.findAccount = function(db, params, callbackSuccess, callbackFail) {
    db.collection('account').findOne({ id: (params.id+"") }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            console.log("계정이 존재하지 않습니다 - A001 (" + params.id + ")");

            callbackFail({
                code   : "A001",
                message: "계정이 존재하지 않습니다"
            });
        }
        else {
            callbackSuccess({
                code    : "0000",
                message : "Success",
                result  : {
                    id          : doc.id,
                    email       : doc.email,
                    type        : doc.type,
                    name        : doc.name,
                    group       : doc.group,
                    image       : doc.image,
                }
            });
        }
    });
};

exports.findAccountByEmail = function(db, params, callbackSuccess) {
    db.collection('account').find({ email: params.email, type: 1 }, {email: 1, name: 1, id: 1, image: 1, group: 1}).toArray(function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                userList    : doc
            }
        });
    });
};

exports.findAccountAllInfo = function(db, params, callbackSuccess, callbackFail) {
    db.collection('account').findOne({ id: params.id }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            console.log("계정이 존재하지 않습니다 - A001 (" + params.id + ")");

            callbackFail({
                code   : "A001",
                message: "계정이 존재하지 않습니다"
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

exports.findAccountAllInsInfo = function(db, params, callbackSuccess, callbackFail) {
    if( params.userId == undefined )
        params.userId = "";

    db.collection('account').aggregate(
        [{
            $match: {
                id: (params.id+"")
            }
        }, {
            $lookup: {
                from: "follow",
                localField: "id",
                foreignField: "ins",
                as: "follow"
            }
        }, {
            $project: {
                item        : 1,
                id          : "$id",
                email       : "$email",
                type        : "$type",
                sns         : "$sns",
                type        : "$type",
                name        : "$name",
                tel         : "$tel",
                birth       : "$birth",
                description : "$description",
                gender      : "$gender",
                group       : "$group",
                image       : "$image",
                followCount : { $size: "$follow" },
                isFollow    : { $indexOfArray: [ "$follow.bgn", params.userId ] },
            }
        }], function(err, doc) {
            if (err) throw err;

            if(doc == null || doc.length == 0) {
                callbackFail({
                    code   : "C001",
                    message: "Invalid Access"
                });
                return;
            }

            callbackSuccess({
                code    : "0000",
                message : "Success",
                result  : doc[0]
            });
        }
    );
};

exports.insertAccount = function(db, params, callbackSuccess) {
    var date  = new Date();
    var hour  = date.getHours();
    var min   = date.getMinutes();
    var sec   = date.getSeconds();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();

    db.collection('account').insertOne({
        _id         : (new ObjectID()).toString(),
        id          : (params.id+""),
        email       : (params.email != null && params.email != undefined ? params.email : null),
        type        : 0,
        sns         : params.sns,
        date        : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
        time        : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec
    }, function(err, res) {
        if (err) throw err;

        console.log("1 document inserted");
        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                id          : (params.id+""),
                email       : params.email,
                type        : 0
            }
        });
    });
};

exports.updateAccountIns = function(db, params, callbackSuccess) {
    var updateData = {
        type    : 1
    }

    if( params.name != undefined )
        updateData.name = params.name;
    if( params.tel != undefined )
        updateData.tel = params.tel;
    if( params.email != undefined )
        updateData.email = params.email;
    if( params.birth != undefined )
        updateData.birth = params.birth;
    if( params.gender != undefined )
        updateData.gender = params.gender;
    if( params.group != undefined )
        updateData.group = params.group;
    if( params.description != undefined )
        updateData.description = params.description;
    if( params.image != undefined )
        updateData.image = params.image;

    db.collection('account').updateOne({
        id    : params.id
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

exports.updateAccountBgn = function(db, params, callbackSuccess) {
    var updateData = {
        type    : 2
    }

    if( params.name != undefined )
        updateData.name = params.name;
    if( params.tel != undefined )
        updateData.tel = params.tel;
    if( params.email != undefined )
        updateData.email = params.email;
    if( params.birth != undefined )
        updateData.birth = params.birth;
    if( params.gender != undefined )
        updateData.gender = params.gender;
    if( params.height != undefined )
        updateData.height = params.height;
    if( params.weight != undefined )
        updateData.weight = params.weight;
    if( params.foot != undefined )
        updateData.foot = params.foot;
    if( params.disease != undefined )
        updateData.disease = params.disease;
    if( params.expCount != undefined )
        updateData.expCount = params.expCount;
    if( params.expYear != undefined )
        updateData.expYear = params.expYear;
    if( params.expMonth != undefined )
        updateData.expMonth = params.expMonth;
    if( params.image != undefined )
        updateData.image = params.image;

    db.collection('account').updateOne({
        id    : params.id
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






exports.insertSearchHistory = function(db, params, callbackSuccess) {
    var date  = new Date();
    var hour  = date.getHours();
    var min   = date.getMinutes();
    var sec   = date.getSeconds();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();

    db.collection('search').update({
        id          : params.id,
        email       : params.email
    }, {
        id          : params.id,
        email       : params.email,
        date        : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
        time        : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec
    }, {
        upsert      : true,
        safe        : false
    }, function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : { }
        });
    });
};

exports.findSearchHistory = function(db, params, callbackSuccess) {
    db.collection('search').find({ id: params.id }).sort({date: -1, time: -1}).toArray(function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                searchList    : doc
            }
        });
    });
};

exports.removeSearchHistory = function(db, params, callbackSuccess) {
    db.collection('search').remove({ id: params.id, email: params.email }, function(err, res) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : { }
        });
    });
};
