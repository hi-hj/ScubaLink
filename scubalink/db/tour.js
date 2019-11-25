var ObjectID = require('mongodb').ObjectID;

exports.addTour = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ insId: params.insId, name: params.name, startdate: params.startdate, enddate: params.enddate, place: params.place }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            var date  = new Date();
            var hour  = date.getHours();
            var min   = date.getMinutes();
            var sec   = date.getSeconds();
            var year  = date.getFullYear();
            var month = date.getMonth() + 1;
            var day   = date.getDate();

            db.collection('tour').insertOne({
                _id         : (new ObjectID()).toString(),
                insId       : params.insId,
                name        : params.name,
                startdate   : params.startdate,
                enddate     : params.enddate,
                place       : params.place,
                member      : params.member,
                description : params.description,
                image       : params.image,
                participant : [params.insId],
                waiting     : [],
                interesting : [],
                schedule    : "",
                cost        : { foc: {flag: false, charge: "", free: ""}, details: [], profit: {type: "", value: ""}, total: "0" },
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
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
    });
};

exports.updateTour = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ _id   : params.tourId }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            var updateData = {};

            if( params.name != undefined )
                updateData.name = params.name;
            if( params.startdate != undefined )
                updateData.startdate = params.startdate;
            if( params.enddate != undefined )
                updateData.enddate = params.enddate;
            if( params.place != undefined )
                updateData.place = params.place;
            if( params.member != undefined ) {
                if( parseInt(params.member) < doc.participant.length ) {
                    callbackFail({
                        code   : "T002",
                        message: "참여 정원을 줄일 수 없습니다."
                    });

                    return;
                }

                updateData.member = params.member;
            }
            if( params.description != undefined )
                updateData.description = params.description;
            if( params.schedule != undefined )
                updateData.schedule = params.schedule;
            if( params.image != undefined )
                updateData.image = params.image;

            db.collection('tour').updateOne({
                _id   : params.tourId
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
        }
    });
};

exports.removeTour = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ _id   : params.tourId }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            db.collection('schedule').remove({ tourid   : params.tourId }, function(err, res) {
                if (err) throw err;

                db.collection('tour').remove({ _id   : params.tourId }, function(err, res) {
                    if (err) throw err;

                    callbackSuccess({
                        code    : "0000",
                        message : "Success",
                        result  : {}
                    });
                });
            });
        }
    });
};

exports.findTours = function(db, params, callbackSuccess, callbackFail) {
    console.log(params.insId);
    db.collection('tour').aggregate(
        [{
            $match: {
                insId: params.insId
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "insId",
                foreignField  : "id",
                as            : "ins"
            }
        }, {
            $unwind   : "$ins"
        }, {
            $lookup: {
                from: "comment",
                localField: "_id",
                foreignField: "tourId",
                as: "comment"
            }
        }, {
            $project: {
                item        : 1,
                name        : "$name",
                startdate   : "$startdate",
                enddate     : "$enddate",
                place       : "$place",
                member      : "$member",
                description : "$description",
                image       : "$image",
                date        : "$date",
                time        : "$time",
                ins_id      : "$insId",
                ins_name    : "$ins.name",
                ins_group   : "$ins.group",
                ins_image   : "$ins.image",
                participant_count   : { $size: "$participant" },
                comment_count       : { $size: "$comment" }
            }
        }]
    ).sort({date: -1, time: -1}).toArray(function(err, doc) {
        if (err) throw err;
        
        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                tourList   : doc
            }
        });
    });
};

exports.findToursByBgn = function(db, params, callbackSuccess, callbackFail) {
    db.collection('follow').aggregate(
        [{
            $match: {
                bgn: params.bgnId
            }
        }, {
            $lookup: {
                from          : "tour",
                localField    : "ins",
                foreignField  : "insId",
                as            : "tour"
            }
        }, {
            $unwind   : "$tour"
        }, {
            $lookup: {
                from          : "account",
                localField    : "tour.insId",
                foreignField  : "id",
                as            : "ins"
            }
        }, {
            $unwind   : "$ins"
        }, {
            $lookup: {
                from: "comment",
                localField: "tour._id",
                foreignField: "tourId",
                as: "comment"
            }
        }, {
            $project: {
                _id         : "$tour._id",
                name        : "$tour.name",
                startdate   : "$tour.startdate",
                enddate     : "$tour.enddate",
                place       : "$tour.place",
                member      : "$tour.member",
                description : "$tour.description",
                image       : "$tour.image",
                date        : "$tour.date",
                time        : "$tour.time",
                ins_id      : "$tour.insId",
                ins_name    : "$ins.name",
                ins_group   : "$ins.group",
                ins_image   : "$ins.image",
                participant_count   : { $size: "$tour.participant" },
                comment_count       : { $size: "$comment" }
            }
        }]
    ).sort({date: -1, time: -1}).toArray(function(err, doc) {
        if (err) throw err;

        db.collection('schedule').aggregate(
            [{
                $match: {
                    $or: [ {
                        id: params.bgnId,
                        type: 1
                    }, {
                        id: params.bgnId,
                        type: 2
                    }]
                }
            }, {
                $lookup: {
                    from          : "tour",
                    localField    : "tourid",
                    foreignField  : "_id",
                    as            : "tour"
                }
            }, {
                $unwind   : "$tour"
            }, {
                $lookup: {
                    from          : "account",
                    localField    : "tour.insId",
                    foreignField  : "id",
                    as            : "ins"
                }
            }, {
                $unwind   : "$ins"
            }, {
                $lookup: {
                    from: "comment",
                    localField: "tour._id",
                    foreignField: "tourId",
                    as: "comment"
                }
            }, {
                $project: {
                    _id         : "$tour._id",
                    name        : "$tour.name",
                    startdate   : "$tour.startdate",
                    enddate     : "$tour.enddate",
                    place       : "$tour.place",
                    member      : "$tour.member",
                    description : "$tour.description",
                    image       : "$tour.image",
                    date        : "$tour.date",
                    time        : "$tour.time",
                    ins_id      : "$tour.insId",
                    ins_name    : "$ins.name",
                    ins_group   : "$ins.group",
                    ins_image   : "$ins.image",
                    participant_count   : { $size: "$tour.participant" },
                    comment_count       : { $size: "$comment" }
                }
            }]
        ).sort({date: -1, time: -1}).toArray(function(err, doc2) {
            if (err) throw err;

            callbackSuccess({
                code    : "0000",
                message : "Success",
                result  : {
                    tourList   : doc,
                    scheduleTourList    : doc2
                }
            });
        });
    });
};

exports.findTourDetail = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').aggregate(
        [{
            $match: {
                _id: params.id
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "participant",
                foreignField  : "id",
                as            : "participant"
            }
        }, {
            $unwind: {
                path                        : "$participant",
                preserveNullAndEmptyArrays  : true
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "insId",
                foreignField  : "id",
                as            : "ins"
            }
        }, {
            $unwind   : "$ins"
        }, {
            $group: {
                _id         : "$_id",
                name        : { "$first": "$name" },
                startdate   : { "$first": "$startdate" },
                enddate     : { "$first": "$enddate" },
                place       : { "$first": "$place" },
                member      : { "$first": "$member" },
                description : { "$first": "$description" },
                image       : { "$first": "$image" },
                schedule    : { "$first": "$schedule" },
                cost        : { "$first": "$cost" },
                date        : { "$first": "$date" },
                time        : { "$first": "$time" },
                ins_id      : { "$first": "$ins.id" },
                ins_name    : { "$first": "$ins.name" },
                ins_group   : { "$first": "$ins.group" },
                ins_image   : { "$first": "$ins.image" },
                participant : { $push:  { id: "$participant.id", name: "$participant.name", image: "$participant.image", type: "$participant.type" } },
                waiting     : { "$first": "$waiting" },
                interesting : { "$first": "$interesting" }
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "waiting",
                foreignField  : "id",
                as            : "waiting"
            }
        }, {
            $unwind: {
                path                        : "$waiting",
                preserveNullAndEmptyArrays  : true
            }
        }, {
            $group: {
                _id         : "$_id",
                name        : { "$first": "$name" },
                startdate   : { "$first": "$startdate" },
                enddate     : { "$first": "$enddate" },
                place       : { "$first": "$place" },
                member      : { "$first": "$member" },
                description : { "$first": "$description" },
                image       : { "$first": "$image" },
                schedule    : { "$first": "$schedule" },
                cost        : { "$first": "$cost" },
                date        : { "$first": "$date" },
                time        : { "$first": "$time" },
                ins_id      : { "$first": "$ins_id" },
                ins_name    : { "$first": "$ins_name" },
                ins_group   : { "$first": "$ins_group" },
                ins_image   : { "$first": "$ins_image" },
                participant : { "$first": "$participant" },
                waiting     : { $push:  { id: "$waiting.id", name: "$waiting.name", image: "$waiting.image", type: "$waiting.type" } },
                interesting : { "$first": "$interesting" }
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "interesting",
                foreignField  : "id",
                as            : "interesting"
            }
        }, {
            $unwind: {
                path                        : "$interesting",
                preserveNullAndEmptyArrays  : true
            }
        }, {
            $group: {
                _id         : "$_id",
                name        : { "$first": "$name" },
                startdate   : { "$first": "$startdate" },
                enddate     : { "$first": "$enddate" },
                place       : { "$first": "$place" },
                member      : { "$first": "$member" },
                description : { "$first": "$description" },
                image       : { "$first": "$image" },
                schedule    : { "$first": "$schedule" },
                cost        : { "$first": "$cost" },
                date        : { "$first": "$date" },
                time        : { "$first": "$time" },
                ins_id      : { "$first": "$ins_id" },
                ins_name    : { "$first": "$ins_name" },
                ins_group   : { "$first": "$ins_group" },
                ins_image   : { "$first": "$ins_image" },
                participant : { "$first": "$participant" },
                waiting     : { "$first": "$waiting" },
                interesting : { $push:  { id: "$interesting.id", name: "$interesting.name", image: "$interesting.image", type: "$interesting.type" } },
            }
        }]
    ).sort({date: -1, time: -1}).toArray(function(err, doc) {
        if (err) throw err;

        if( doc.length == 0 ) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            callbackSuccess({
                code    : "0000",
                message : "Success",
                result  : doc[0]
            });
        }
    });
};

exports.changeTourMember = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ _id: params.tourId }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            if( params.type == 1 && parseInt(doc.member) <= doc.participant.length ) {
                callbackFail({
                    code   : "T001",
                    message: "참가 인원이 초과되었습니다."
                });

                return;
            }

            if( params.type == 1 ) {
                if( doc.waiting.indexOf(params.id) >= 0 )
                    doc.waiting.splice(doc.waiting.indexOf(params.id), 1);
                if( doc.interesting.indexOf(params.id) >= 0 )
                    doc.interesting.splice(doc.interesting.indexOf(params.id), 1);

                if( doc.participant.indexOf(params.id) < 0 )
                    doc.participant.push(params.id);
            }
            else if( params.type == 2 ) {
                if( doc.waiting.indexOf(params.id) >= 0 )
                    doc.waiting.splice(doc.waiting.indexOf(params.id), 1);
                if( doc.participant.indexOf(params.id) >= 0 )
                    doc.participant.splice(doc.interesting.indexOf(params.id), 1);

                if( doc.interesting.indexOf(params.id) < 0 )
                    doc.interesting.push(params.id);
            }
            else if( params.type == 3 ) {
                if( doc.participant.indexOf(params.id) >= 0 )
                    doc.participant.splice(doc.waiting.indexOf(params.id), 1);
                if( doc.interesting.indexOf(params.id) >= 0 )
                    doc.interesting.splice(doc.interesting.indexOf(params.id), 1);

                if( doc.waiting.indexOf(params.id) < 0 )
                    doc.waiting.push(params.id);
            }

            db.collection('tour').updateOne({
                _id   : params.tourId
            }, {
                $set  : {
                    participant : doc.participant,
                    interesting : doc.interesting,
                    waiting     : doc.waiting
                }
            }, function(err, doc) {
                if (err) throw err;

                db.collection('tour').aggregate(
                    [{
                        $match: {
                            _id: params.tourId
                        }
                    }, {
                        $lookup: {
                            from          : "account",
                            localField    : "participant",
                            foreignField  : "id",
                            as            : "participant"
                        }
                    }, {
                        $unwind: {
                            path                        : "$participant",
                            preserveNullAndEmptyArrays  : true
                        }
                    }, {
                        $group: {
                            _id         : "$_id",
                            participant : { $push:  { id: "$participant.id", name: "$participant.name", image: "$participant.image" } },
                            waiting     : { "$first": "$waiting" },
                            interesting : { "$first": "$interesting" }
                        }
                    }, {
                        $lookup: {
                            from          : "account",
                            localField    : "waiting",
                            foreignField  : "id",
                            as            : "waiting"
                        }
                    }, {
                        $unwind: {
                            path                        : "$waiting",
                            preserveNullAndEmptyArrays  : true
                        }
                    }, {
                        $group: {
                            _id         : "$_id",
                            participant : { "$first": "$participant" },
                            waiting     : { $push:  { id: "$waiting.id", name: "$waiting.name", image: "$waiting.image" } },
                            interesting : { "$first": "$interesting" }
                        }
                    }, {
                        $lookup: {
                            from          : "account",
                            localField    : "interesting",
                            foreignField  : "id",
                            as            : "interesting"
                        }
                    }, {
                        $unwind: {
                            path                        : "$interesting",
                            preserveNullAndEmptyArrays  : true
                        }
                    }, {
                        $group: {
                            _id         : "$_id",
                            participant : { "$first": "$participant" },
                            waiting     : { "$first": "$waiting" },
                            interesting : { $push:  { id: "$interesting.id", name: "$interesting.name", image: "$interesting.image" } },
                        }
                    }]
                ).toArray(function(err, doc) {
                    if (err) throw err;

                    console.log(doc);

                    if( doc.length == 0 ) {
                        callbackFail({
                            code   : "C001",
                            message: "Invalid Access"
                        });
                    }
                    else {
                        console.log(doc[0]);

                        callbackSuccess({
                            code    : "0000",
                            message : "Success",
                            result  : doc[0]
                        });
                    }
                });
            });
        }
    });
};

exports.findTourSchedule = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ _id: params.id }, { _id: 1, schedule: 1 }, function(err, doc) {
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

exports.updateTourCost = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ _id: params.tourId }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            db.collection('tour').updateOne({
                _id   : params.tourId
            }, {
                $set  : {
                    cost        : params.cost
                }
            }, function(err, doc) {
                if (err) throw err;

                callbackSuccess({
                    code    : "0000",
                    message : "Success",
                    result  : {

                    }
                });
            });
        }
    });
};
