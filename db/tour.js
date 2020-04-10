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
                insCount    : params.insCount,
                bgnCount    : params.bgnCount,
                description : params.description,
                image       : params.image,
                participant : [{ id: params.insId, type: 1 }],
                waiting     : [],
                interesting : [],
                schedule    : "",
                cost        : null,
                date        : year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day,
                time        : (hour < 10 ? "0" : "") + hour + (min < 10 ? "0" : "") + min + (sec < 10 ? "0" : "") + sec,
                status      : 'HIDE'
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
            if( params.insCount != undefined ) {
                if (parseInt(params.insCount) < doc.participant.filter(item => item.type == 1).length) {
                    callbackFail({
                        code   : "T002",
                        message: "참여 정원을 줄일 수 없습니다."
                    });

                    return;
                }

                updateData.insCount = parseInt(params.insCount);
            }
            if( params.bgnCount != undefined ) {
                if (parseInt(params.bgnCount) < doc.participant.filter(item => item.type == 2).length) {
                    callbackFail({
                        code   : "T002",
                        message: "참여 정원을 줄일 수 없습니다."
                    });

                    return;
                }

                updateData.bgnCount = parseInt(params.bgnCount);
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
                status      : "$status",
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

        if (params.userId !== undefined && params.insId !== params.userId) {
            doc = doc.filter(item => item.status !== "HIDE");
        }

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
                status      : "$tour.status",
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
                    status      : "$tour.status",
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

            doc = doc.filter(item => item.status !== "HIDE");
            doc2 = doc2.filter(item => item.status !== "HIDE");

            doc2.forEach(item => {
                if (doc.map(item2 => item2._id).indexOf(item._id) === -1) {
                    doc.push(item);
                }
            });

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
                localField    : "participant.id",
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
                insCount    : { "$first": "$insCount" },
                bgnCount    : { "$first": "$bgnCount" },
                description : { "$first": "$description" },
                image       : { "$first": "$image" },
                schedule    : { "$first": "$schedule" },
                cost        : { "$first": "$cost" },
                date        : { "$first": "$date" },
                time        : { "$first": "$time" },
                status      : { "$first": "$status" },
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
                localField    : "waiting.id",
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
                insCount    : { "$first": "$insCount" },
                bgnCount    : { "$first": "$bgnCount" },
                description : { "$first": "$description" },
                image       : { "$first": "$image" },
                schedule    : { "$first": "$schedule" },
                cost        : { "$first": "$cost" },
                date        : { "$first": "$date" },
                time        : { "$first": "$time" },
                status      : { "$first": "$status" },
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
                localField    : "interesting.id",
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
                insCount    : { "$first": "$insCount" },
                bgnCount    : { "$first": "$bgnCount" },
                description : { "$first": "$description" },
                image       : { "$first": "$image" },
                schedule    : { "$first": "$schedule" },
                cost        : { "$first": "$cost" },
                date        : { "$first": "$date" },
                time        : { "$first": "$time" },
                status      : { "$first": "$status" },
                ins_id      : { "$first": "$ins_id" },
                ins_name    : { "$first": "$ins_name" },
                ins_group   : { "$first": "$ins_group" },
                ins_image   : { "$first": "$ins_image" },
                participant : { "$first": "$participant" },
                waiting     : { "$first": "$waiting" },
                interesting : { $push:  { id: "$interesting.id", name: "$interesting.name", image: "$interesting.image", type: "$interesting.type" } },
            }
        }, {
            $lookup: {
                from: "follow",
                localField: "ins_id",
                foreignField: "ins",
                as: "follow"
            }
        }, {
            $project: {
                _id         : "$_id",
                name        : "$name",
                startdate   : "$startdate",
                enddate     : "$enddate",
                place       : "$place",
                member      : "$member",
                insCount    : "$insCount",
                bgnCount    : "$bgnCount",
                description : "$description",
                image       : "$image",
                schedule    : "$schedule",
                cost        : "$cost",
                date        : "$date",
                time        : "$time",
                status      : "$status",
                ins_id      : "$ins_id",
                ins_name    : "$ins_name",
                ins_group   : "$ins_group",
                ins_image   : "$ins_image",
                participant : "$participant",
                waiting     : "$waiting",
                interesting : "$interesting",
                isFollow    : { $indexOfArray: [ "$follow.bgn", params.userId ] },
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
            if (doc.status !== 'ING' || (new Date(parseInt(doc.startdate.substr(0, 4)), parseInt(doc.startdate.substr(4, 2))-1, parseInt(doc.startdate.substr(6, 2)))).getTime() < (new Date()).getTime()) {
                callbackFail({
                    code   : "T004",
                    message: "모집이 마감되었습니다."
                });

                return;
            }
            if (params.type == 1 && parseInt(doc.member) <= doc.participant.length) {
                callbackFail({
                    code   : "T001",
                    message: "참가 인원이 초과되었습니다."
                });

                return;
            }

            // 강사가 참가 상태로 변경 요청
            if (params.type == 1 && params.memberType == 1) {
                if (parseInt(doc.insCount) <= doc.participant.filter(item => item.type == params.memberType).length) {
                    callbackFail({
                        code   : "T001",
                        message: "참가 인원이 초과되었습니다."
                    });

                    return;
                }
            }
            // 교육생이 참가 상태로 변경 요청
            else if (params.type == 1 && params.memberType == 2) {
                if (parseInt(doc.bgnCount) <= doc.participant.filter(item => item.type == params.memberType).length) {
                    callbackFail({
                        code   : "T001",
                        message: "참가 인원이 초과되었습니다."
                    });

                    return;
                }
            }

            var item = null;
            var indexWaiting = doc.waiting.map(item => item.id).indexOf(params.id);
            var indexInteresting = doc.interesting.map(item => item.id).indexOf(params.id);
            var indexParticipant = doc.participant.map(item => item.id).indexOf(params.id);

            if( params.type == 1 ) {
                if (indexWaiting >= 0) {
                    item = doc.waiting.splice(indexWaiting, 1)[0];
                } else if (indexInteresting >= 0) {
                    item = doc.interesting.splice(indexInteresting, 1)[0];
                }

                if (indexParticipant === -1) {
                    if (item === null) {
                        doc.participant.push({ id: params.id, type: params.memberType });
                    } else {
                        doc.participant.push(item);
                    }
                }
            }
            else if( params.type == 2 ) {
                if (indexWaiting >= 0) {
                    item = doc.waiting.splice(indexWaiting, 1)[0];
                } else if (indexParticipant >= 0) {
                    item = doc.participant.splice(indexParticipant, 1)[0];
                }

                if (indexInteresting === -1) {
                    if (item === null) {
                        doc.interesting.push({ id: params.id, type: params.memberType });
                    } else {
                        doc.interesting.push(item);
                    }
                }
            }
            else if( params.type == 3 ) {
                if (indexInteresting >= 0) {
                    item = doc.interesting.splice(indexInteresting, 1)[0];
                } else if (indexParticipant >= 0) {
                    item = doc.participant.splice(indexParticipant, 1)[0];
                }

                if (indexWaiting === -1) {
                    if (item === null) {
                        doc.waiting.push({ id: params.id, type: params.memberType });
                    } else {
                        doc.waiting.push(item);
                    }
                }
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
                            localField    : "participant.id",
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
                            localField    : "waiting.id",
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
                            localField    : "interesting.id",
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
            });
        }
    });
};

exports.findTourParticipantDetail = function(db, params, callbackSuccess, callbackFail) {
    db.collection('tour').aggregate(
        [{
            $match: {
                _id: params.id
            }
        }, {
            $lookup: {
                from          : "follow",
                localField    : "participant.id",
                foreignField  : "bgn",
                as            : "follow"
            }
        }, {
            $lookup: {
                from          : "account",
                localField    : "participant.id",
                foreignField  : "id",
                as            : "participants"
            }
        }, {
            $unwind: {
                path                        : "$participants",
                preserveNullAndEmptyArrays  : true
            }
        }, {
            $group: {
                _id         : "$_id",
                participant : {
                    $push:  {
                        id: "$participants.id",
                        name: "$participants.name",
                        image: "$participants.image",
                        gender: "$participants.gender",
                        height: "$participants.height",
                        weight: "$participants.weight",
                        foot: "$participants.foot",
                        disease: "$participants.disease",
                        type: "$participants.type",
                        memo: "$follow.memo"
                    }
                }
            }
        }]
    ).toArray(function(err, doc) {
        if (err) throw err;

        doc[0].participant = doc[0].participant.map((item, index) => {
            if (index === 0) {
                item.memo = '';
            } else {
                item.memo = item.memo[index-1];
            }
            return item;
        });

        if( doc.length === 0 ) {
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

exports.findTourParticipant = function (db, params, callbackSuccess, callbackFail) {
    db.collection('tour').findOne({ _id: params.tourId }, function(err, doc) {
        if (err) throw err;

        if(doc == null) {
            callbackFail({
                code   : "C001",
                message: "Invalid Access"
            });
        }
        else {
            if (params.status === 'HIDE' && doc.participant.length > 1) {
                callbackFail({
                    code   : "T003",
                    message: "참가자가 있는 경우 비공개가 불가능합니다."
                });
            } else {
                callbackSuccess({
                    code: "0000",
                    message: "Success",
                    result: doc
                });
            }
        }
    });
};

exports.updateTourStatus = function(db, params, callbackSuccess) {
    db.collection('tour').updateOne({
        _id   : params.tourId
    }, {
        $set  : {
            status     : params.status
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
