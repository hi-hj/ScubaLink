var createError     = require('http-errors');
var express         = require('express');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var session         = require('express-session');
var MongoStore      = require('connect-mongo')(session);
var bodyParser      = require('body-parser');
var path            = require('path');

// AWS S3 이미지 업로드 모듈
var aws             = require('aws-sdk')
var multer          = require('multer')
var multerS3        = require('multer-s3');

aws.config.loadFromPath(__dirname + "/config/awsconfig.json");
var s3 = new aws.S3();
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "scubalink-bucket",
        key: function (req, file, cb) {
            var extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write',
    })
})


var app = express();

/* Mongo DB */
var MongoClient = require('mongodb').MongoClient;
var assert      = require('assert');
var url         = 'mongodb://localhost:27017/scubalink';
var db          = null;

var dbAccount         = require('./db/account');
var dbFollow          = require('./db/follow');
var dbCertification   = require('./db/certification');
var dbNotice          = require('./db/notice');
var dbTour            = require('./db/tour');
var dbSchedule        = require('./db/schedule');
var dbComment         = require('./db/comment');

MongoClient.connect(url, function(err, mongodb) {
    db = mongodb;
});

// view engine setup
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 80);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended  : true
}));
app.use(cookieParser());
app.use(session({
    secret: 'scubalink secret',
    store: new MongoStore({
        url : url,
        ttl : 60 * 60  // 1 hour (default: 14days)
    })
}));

/* Html Static Location Setting */
app.use(express.static(__dirname + '/resources'));


/* Email */
// 메일발송 모듈
var nodemailer = require('nodemailer');

// 메일 설정 코드
var transporter = nodemailer.createTransport({
    service: 'naver',
    auth: {
        user: 'scubalink@naver.com',
        pass: 'global5378'
    }
});


/* Page Redirection */
app.get('/', function(req, res) {
    // 로그인 세션이 유지되어있으며, 강사나 교육생 가입까지 완료될 경우
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined && req.session.type != 0 ) {
   //     if( req.session.type == 1 ) {
     req.session.type='1';
           // req.body.insId = req.session.snsId;
req.body.insId = '773582231';
            dbTour.findTours(db, req.body, function(result) {
            
                result.result.type    = req.session.type;
                result.result.name    = req.session.name;
                result.result.group   = req.session.group;
                result.result.image   = req.session.image;
             
                res.render('home_ins', result.result);
            });
     //   }
       /* else if( req.session.type == 2 ) {
            req.body.bgnId = req.session.snsId;

            dbTour.findToursByBgn(db, req.body, function(result) {
                result.result.type    = req.session.type;
                result.result.name    = req.session.name;
                result.result.image   = req.session.image;

                res.render('home_bgn', result.result);
            });
        }
        else {
            res.render('start');
     //   }
   // }
   // else {
    //    res.render('start');
   // }
   */
});

app.get('/join', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('join');
    }
    else {
        res.redirect('/');
    }
});

app.get('/join_ins', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('join_ins', {
            id    : req.session.snsId
        });
    }
    else {
        res.redirect('/');
    }
});

app.get('/join_bgn_01', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('join_bgn_01');
    }
    else {
        res.redirect('/');
    }
});

app.get('/join_bgn_02_params', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.session.joinName  = decodeURI(req.query.n);
        req.session.joinTel   = req.query.t;
        req.session.joinBirth = req.query.b;
        req.session.joinEmail = decodeURI(req.query.e);

        res.redirect('join_bgn_02');
    }
    else {
        res.redirect('/');
    }
});

app.get('/join_bgn_02', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('join_bgn_02');
    }
    else {
        res.redirect('/');
    }
});

app.get('/join_bgn_03_params', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.session.joinGender  = req.query.g;
        req.session.joinHeight  = req.query.h;
        req.session.joinWeight  = req.query.w;
        req.session.joinFoot    = req.query.f;
        req.session.joinDisease = decodeURI(req.query.d);

        res.redirect('join_bgn_03');
    }
    else {
        res.redirect('/');
    }
});

app.get('/join_bgn_03', function(req, res) {
    if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('join_bgn_03');
    }
    else {
        res.redirect('/');
    }
});













/* 로컬 세팅 시작 */


app.get('/home_search', function(req, res) {
    console.log('a');

    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
       //req.body.id = req.session.snsId;
       /*아래 줄은 로컬 개발용 */
        req.body.id = 'o8y1MlYd2QF8jK6-NTfhVKj8r86xT2lG';

        dbAccount.findSearchHistory(db, req.body, function(result) {
            res.render('home_search', result.result);
       // });
    });
    //else {
      //  res.redirect('/');
    //}
});

app.get('/profile_ins', function(req, res) {
   //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
   //     req.body.id = req.session.snsId;
   req.body.id = '773582231';
        dbAccount.findAccountAllInfo(db, req.body, function(result) {
            res.render('profile_ins', result.result);
        }, function(result) {
            res.redirect('/');
        });
 //   }
    //else {
    //    res.redirect('/');
    //}
});

app.get('/profile_bgn', function(req, res) {
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
      //  req.body.id = req.session.snsId;

      //교육생 id
      req.body.id = '8524539';
        dbAccount.findAccountAllInfo(db, req.body, function(result) {
            res.render('profile_bgn', result.result);
        }, function(result) {
            res.redirect('/');
        });
    //}
    //else {
    //    res.redirect('/');
    //}
});

app.get('/profile_edit', function(req, res) {
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
   //     req.body.id = req.session.snsId;
    req.body.id = '773582231';
        dbAccount.findAccountAllInfo(db, req.body, function(result) {
            res.render('profile_edit', result.result);
        }, function(result) {
            res.redirect('/');
        });
    //}
    //else {
    //    res.redirect('/');
    //}
});

app.get('/mybgn', function(req, res) {
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
    //    req.body.id = req.session.snsId;
 req.body.id = '773582231';
        dbFollow.findFollowers(db, req.body, function(result) {
            res.render('menu_my_bgn', {
                id            : req.session.snsId,
                followerList  : result.result.followerList
            });
        });
    //}
    //else {
    //    res.redirect('/');
   // }
});

app.get('/profile/:no', function(req, res){
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;
     //   req.body.userId = req.session.snsId;
 req.body.id = '773582231';
        dbAccount.findAccountAllInsInfo(db, req.body, function(result) {
            req.body.insId     = req.params.no;
            dbTour.findTours(db, req.body, function(result02) {
                result.result.tourList = result02.result.tourList;
                result.result.userType = req.session.type;
                res.render('home_profile', result.result);
            });
        }, function(result) {
            res.redirect('/');
        });
   // }
   // else {
    //    res.redirect('/');
   // }
});

app.get('/license', function(req, res) {
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
   //     req.body.id = req.session.snsId;
 req.body.id = '773582231';
        dbCertification.findCertifications(db, req.body, function(result) {
            res.render('menu_license', result.result);
        });
   // }
   // else {
   //     res.redirect('/');
   // }
});

app.get('/license_detail/:no', function(req, res) {
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;
 req.body.id = '773582231';
        dbCertification.findCertificationDetail(db, req.body, function(result) {
            res.render('menu_license_detail', result.result);
        }, function(result) {
            res.redirect('/');
        });
 //   }
 //   else {
 //       res.redirect('/');
 //   }
});

app.get('/license_edit/:no', function(req, res) {
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;
 req.body.id = '773582231';
        dbCertification.findCertificationDetail(db, req.body, function(result) {
            res.render('menu_license_edit', result.result);
        }, function(result) {
            res.redirect('/');
        });
    //}
    //else {
     //   res.redirect('/');
    //}
});

app.get('/license_add', function(req, res) {

    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('menu_license_add');
    //}
    //else {
    //    res.redirect('/');
    //}
});

app.get('/policy', function(req, res) {
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('menu_policy');
    //}
    //else {
    //    res.redirect('/');
   // }
});

app.get('/notice', function(req, res) {
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        dbNotice.findNotices(db, req.body, function(result) {
            res.render('menu_notice', result.result);
        });
    //}
    //else {
    //    res.redirect('/');
   // }
});

app.get('/notice/:no', function(req, res) {
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;
 req.body.id = '773582231';
        dbNotice.findNoticeDetail(db, req.body, function(result) {
            res.render('menu_notice_detail', result.result);
        }, function(result) {
            res.redirect('/');
        });
    //}
    //else {
    //    res.redirect('/');
   // }
});

app.get('/tour_add', function(req, res) {
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        res.render('tour_add');
    //}
    //else {
    //   res.redirect('/');
    //}
});

app.get('/tour/:no', function(req, res){
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;

        dbTour.findTourDetail(db, req.body, function(result) {
            result.result.userId = '773582231';
            result.result.userType = '1';

            req.body.tourId     = req.params.no;
            dbComment.findComment(db, req.body, function(result02) {
                result.result.commentList = result02.result.commentList;
                res.render('tour_detail', result.result);
            });
        }, function(result) {
            res.redirect('/');
        });
    //}
    //else {
     //   res.redirect('/');
    //}
});

app.get('/tour_edit/:no', function(req, res) {
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
      req.body.id     = req.params.no;

      dbTour.findTourDetail(db, req.body, function(result) {
          result.result.userId = '773582231';
          result.result.userType = '1';

          res.render('tour_edit', result.result);
      }, function(result) {
          res.redirect('/');
      });
    //}
    //else {
    //    res.redirect('/');
   // }
});

app.get('/tour_comment/:no', function(req, res) {
  //  if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
      req.body.tourId     = req.params.no;

      dbComment.findComment(db, req.body, function(result) {
          result.result._id = req.body.tourId;
          result.result.t = req.query.t;
          res.render('tour_comment', result.result);
      });
   // }
   // else {
    //    res.redirect('/');
   // }
});

app.get('/tour/schedule/:no', function(req, res){
   // if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;

        dbTour.findTourSchedule(db, req.body, function(result) {
            res.render('tour_schedule', result.result);
        }, function(result) {
            res.redirect('/');
        });
   // }
   // else {
    //    res.redirect('/');
   // }
});

app.get('/tour/cost/:no', function(req, res){
    //if( req.session && req.session.snsId != undefined && req.session.type != undefined ) {
        req.body.id     = req.params.no;

        dbTour.findTourDetail(db, req.body, function(result) {
            res.render('tour_cost', result.result);
        }, function(result) {
            res.redirect('/');
        });
    //}
    //else {
    //    res.redirect('/');
   // }
});


app.post('/join/sns', function(req, res) {
    dbAccount.findAccount(db, req.body, function(result) {
        req.session.snsId       = result.result.id;
        req.session.type        = result.result.type;
        if( result.result.type != 0 ) {
            req.session.name    = result.result.name;
            req.session.group   = result.result.group;
            req.session.image   = result.result.image;
        }

        res.writeHead(200);
        res.end(JSON.stringify(result));
    }, function(result) {
        dbAccount.insertAccount(db, req.body, function(result) {
            req.session.snsId       = result.result.id;
            req.session.type        = result.result.type;

            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    });
});

app.post('/join/scubalink', function(req, res) {
    if( req.session.snsId == undefined ) {
        res.writeHead(200);
        res.end(JSON.stringify({
              code    : "S001",
              message : "세션이 만료되었습니다"
        }));
    }

    req.body.id = req.session.snsId;
    dbAccount.findAccount(db, req.body, function(result) {
        // 강사 가입
        if( req.body.type == 1 ) {
            dbAccount.updateAccountIns(db, req.body, function(result) {
                req.session.type      = 1;
                req.session.name      = req.body.name;

                res.writeHead(200);
                res.end(JSON.stringify(result));
            });
        }
        // 교육생 가입
        else if( req.body.type == 2 ) {
            req.body.name     = req.session.joinName;
            req.body.tel      = req.session.joinTel;
            req.body.birth    = req.session.joinBirth;
            req.body.email    = req.session.joinEmail;
            req.body.gender   = req.session.joinGender;
            req.body.height   = req.session.joinHeight;
            req.body.weight   = req.session.joinWeight;
            req.body.foot     = req.session.joinFoot;
            req.body.disease  = req.session.joinDisease;

            dbAccount.updateAccountBgn(db, req.body, function(result) {
                req.session.type        = 2;
                req.session.name        = req.body.name;

                req.session.joinName    = undefined;
                req.session.joinTel     = undefined;
                req.session.joinBirth   = undefined;
                req.session.joinEmail   = undefined;
                req.session.joinGender  = undefined;
                req.session.joinHeight  = undefined;
                req.session.joinWeight  = undefined;
                req.session.joinFoot    = undefined;
                req.session.joinDisease = undefined;

                res.writeHead(200);
                res.end(JSON.stringify(result));
            });
        }
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify({
              code    : "S001",
              message : "세션이 만료되었습니다"
        }));
    });
});

app.post('/profile/update', upload.single('userImage'), function(req, res) {
    if( req.session.snsId == undefined ) {
        res.writeHead(200);
        res.end(JSON.stringify({
              code    : "S001",
              message : "세션이 만료되었습니다"
        }));
    }

    req.body.id = req.session.snsId;
    req.body.type = req.session.type;

    if( req.file != undefined )
        req.body.image  = req.file.location;
    else
        req.body.image  = undefined;

    dbAccount.findAccount(db, req.body, function(result) {
        // 강사 프로필 변경
        if( req.body.type == 1 ) {
            dbAccount.updateAccountIns(db, req.body, function(result) {
                req.session.name      = req.body.name;
                req.session.group     = req.body.group;
                req.session.image     = req.body.image;

                res.writeHead(200);
                res.end(JSON.stringify(result));
            });
        }
        // 교육생 프로필 변경
        else if( req.body.type == 2 ) {
            dbAccount.updateAccountBgn(db, req.body, function(result) {
                req.session.name        = req.body.name;
                req.session.image       = req.body.image;

                res.writeHead(200);
                res.end(JSON.stringify(result));
            });
        }
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify({
              code    : "S001",
              message : "세션이 만료되었습니다"
        }));
    });
});

app.post('/profile/select', function(req, res) {
    
    //req.body.id = req.session.snsId;
     req.body.id = '773582231';
    dbAccount.findAccountAllInfo(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/logout', function(req, res) {
    if( req.session ) {
        req.session.destroy();
    }

    res.writeHead(200);
    res.end(JSON.stringify({
        code    : "0000",
        message : "Success",
        result  : {}
    }));
});

app.post('/search/ins', function(req, res) {
    //req.body.id = req.session.snsId;
     req.body.id = '773582231';
    dbAccount.insertSearchHistory(db, req.body, function(result) {
        dbAccount.findAccountByEmail(db, req.body, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    });
});

app.post('/search/ins/remove', function(req, res) {
   // req.body.id = req.session.snsId;
    req.body.id = '773582231';
    dbAccount.removeSearchHistory(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/follow/update', function(req, res){
    req.body.bgn = req.session.snsId;

    if(req.body.type == 1) {
        dbFollow.addFollow(db, req.body, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    }
    else if(req.body.type == 2) {
        dbFollow.removeFollow(db, req.body, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    }
    else {
        res.writeHead(200);
        res.end(JSON.stringify({
            code    : "C001",
            message : "비정상적인 접근입니다"
        }));
    }
});

app.post('/certification/add', upload.single('certImage'), function(req, res) {
//    req.body.id = req.session.snsId;
 req.body.id = '773582231';
    if( req.file != undefined )
        req.body.image  = req.file.location;
    else
        req.body.image  = undefined;

    dbCertification.addCertification(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/certification/select', function(req, res){
 //   req.body.id = req.session.snsId;
 req.body.id = '773582231';
    dbCertification.findCertifications(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/certification/update', upload.single('certImage'), function(req, res) {
    if( req.file != undefined )
        req.body.image  = req.file.location;
    else
        req.body.image  = undefined;

    dbCertification.updateCertification(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/certification/remove', function(req, res){
    dbCertification.removeCertification(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});


app.post('/email/send', function(req, res){
    var mailOptions = {
        from: 'scubalink@naver.com',
        to: 'shnam@12cm.co.kr',
        subject: 'Nodemailer 테스트',
        text: 'Nodemailer 테스트 내용'
    };

    transporter.sendMail(mailOptions, function(error, response){
        if (error){
            console.log(error);
        } else {
            console.log("Message sent : " + response.message);
        }
        transporter.close();
    });

    res.writeHead(200);
    res.end(JSON.stringify({
        code    : "0000",
        message : "Success",
        result  : {}
    }));
});

app.post('/tour/add', upload.single('tourImage'), function(req, res) {
   // req.body.insId    = req.session.snsId;
 //   req.body.insName  = req.session.name;
 req.body.insId = '773582231';
req.body.insName='카카오강사';

    if( req.file != undefined )
        req.body.image  = req.file.location;
    else
        req.body.image  = undefined;

    dbTour.addTour(db, req.body, function(result) {
        req.body.id       = req.session.snsId;
        req.body.tourId   = result.result.tourId;
        req.body.type     = 1;

        dbSchedule.updateSchedule(db, req.body, function(result02) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/select', function(req, res){
    //req.body.insId = req.session.snsId;
 req.body.id = '773582231';
    dbTour.findTours(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/detail', function(req, res){
    dbTour.findTourDetail(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/update', upload.single('tourImage'), function(req, res) {
    if( req.file != undefined )
        req.body.image  = req.file.location;
    else
        req.body.image  = undefined;

    dbTour.updateTour(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/remove', function(req, res){
    dbTour.removeTour(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});


app.post('/tour/participate', function(req, res){
    //req.body.id = req.session.snsId;
     req.body.id = '773582231';
    req.body.type = 1;

    dbTour.changeTourMember(db, req.body, function(result) {
        dbSchedule.updateSchedule(db, req.body, function(result02) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/interest', function(req, res){
     req.body.id = '773582231';
     //req.body.id = req.session.snsId;
    req.body.type = 2;

    dbTour.changeTourMember(db, req.body, function(result) {
        dbSchedule.updateSchedule(db, req.body, function(result02) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/wait', function(req, res){
    req.body.id = '773582231';
    // req.body.id = req.session.snsId;
    req.body.type = 3;

    dbTour.changeTourMember(db, req.body, function(result) {
        dbSchedule.updateSchedule(db, req.body, function(result02) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        }, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    }, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/select/bgn', function(req, res){
    req.body.bgnId = req.session.snsId;

    dbTour.findToursByBgn(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/tour/cost/update', function(req, res){
    //req.body.id = req.session.snsId;
 req.body.id = '773582231';
    dbTour.updateTourCost(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});

app.post('/comment/add', function(req, res) {
    req.body.user     = req.session.snsId;
    req.body.type     = req.session.type;
    req.body.name     = req.session.name;
    req.body.image    = req.session.image;
    dbComment.insertComment(db, req.body, function(result) {
        dbComment.findComment(db, req.body, function(result) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
        });
    });
});

app.post('/comment/find', function(req, res) {
    dbComment.findComment(db, req.body, function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
    });
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
