exports.findNotices = function(db, params, callbackSuccess, callbackFail) {
    db.collection('notice').find({}).sort({date: -1, time: -1}).toArray(function(err, doc) {
        if (err) throw err;

        callbackSuccess({
            code    : "0000",
            message : "Success",
            result  : {
                noticeList   : doc
            }
        });
    });
};

exports.findNoticeDetail = function(db, params, callbackSuccess, callbackFail) {
    db.collection('notice').findOne({ _id: params.id }, function(err, doc) {
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
