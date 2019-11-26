
// HTTP Module 객체 생성
var httpSend = Object.create(Object.prototype);
httpSend.requestHeader = [];

// AJAX 발송 함수
httpSend.send = function(url, params, method, success, failed) {
    if( url == undefined )
        throw "parameter 'url' is undefined";
    if( method == undefined )
        throw "parameter 'method' is undefined (GET / POST / PUT / DELETE / ..)";
    if( params == undefined )
        throw "parameter 'params' is undefined \nIf there is no parameter, send parameter {}";

    var xmlhttp;
    if( window.XMLHttpRequest ) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if( params === undefined )
        params = {};

    var paramsKeys = Object.keys(params);
    var paramsStr = "";
    for(var i=0; i<paramsKeys.length; i++) {
        if ( params.hasOwnProperty(paramsKeys[i]) ) {
            paramsStr += (paramsKeys[i] + "=" + params[paramsKeys[i]] + "&");
        }
    }
    paramsStr = paramsStr.substr(0, paramsStr.length-1);

    xmlhttp.onreadystatechange = function() {
        if( xmlhttp.readyState === 4 ) {
            if( xmlhttp.status === 200 ) {
                var xmlhttpresult = JSON.parse(xmlhttp.response);

                if( xmlhttpresult.code == "0000" ) {
                    if( success != undefined )
                        success(xmlhttpresult.result);
                }
                else {
                    if( failed != undefined )
                        failed(xmlhttpresult.code, xmlhttpresult.message);
                }
            }
            else {
                if( failed != undefined )
                    failed(xmlhttp.status, xmlhttp.statusText);
            }
        }
    }

    xmlhttp.open(method, url, true);

    var contentType = "application/json";
    if( httpSend.requestHeader["Content-Type"] == "application/x-www-form-urlencoded" )
        contentType = "application/x-www-form-urlencoded";
    xmlhttp.setRequestHeader("Content-Type", contentType);

    xmlhttp.setRequestHeader("Accept", "application/json");
    if( httpSend.requestHeader["Accept"] != undefined )
        xmlhttp.setRequestHeader("Accept", httpSend.requestHeader["Accept"]);

    if( httpSend.requestHeader["Accept-Language"] != undefined )
        xmlhttp.setRequestHeader("Accept-Language", httpSend.requestHeader["Accept-Language"]);

    if( httpSend.requestHeader["Authorization"] != undefined )
        xmlhttp.setRequestHeader("Authorization", httpSend.requestHeader["Authorization"]);


    if( contentType == "application/json" )
        xmlhttp.send(JSON.stringify(params));
    else if( contentType == "application/x-www-form-urlencoded" )
        xmlhttp.send(paramsStr);

    // xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('22cd9435-c1ef-4a1c-a511-791303a5a20f' + ':' + '33663161393164662D303534302D343739332D383562612D356637666264636135643934'));
}

// 이미지 업로드 함수
httpSend.upload = function(url, params, success, failed) {
    if( url == undefined )
        throw "parameter 'url' is undefined";
    if( params == undefined )
        throw "parameter 'params' is undefined \nIf there is no parameter, send parameter {}";

    var xmlhttp;
    if( window.XMLHttpRequest ) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var formData = new FormData();
    var paramsKeys = Object.keys(params);
    for(var i=0; i<paramsKeys.length; i++) {
        if ( params.hasOwnProperty(paramsKeys[i]) ) {
            formData.append(paramsKeys[i], params[paramsKeys[i]]);
        }
    }

    xmlhttp.onreadystatechange = function() {
        if( xmlhttp.readyState === 4 ) {
            if( xmlhttp.status === 200 ) {
                var xmlhttpresult = JSON.parse(xmlhttp.response);

                if( xmlhttpresult.code == "0000" ) {
                    if( success != undefined )
                        success(xmlhttpresult.result);
                }
                else {
                    if( failed != undefined )
                        failed(xmlhttpresult.code, xmlhttpresult.message);
                }
            }
            else {
                if( failed != undefined )
                    failed(xmlhttp.status, xmlhttp.statusText);
            }
        }
    }

    xmlhttp.open("post", url, true);

    xmlhttp.setRequestHeader("Accept", "application/json");

    if( httpSend.requestHeader["Accept-Language"] != undefined )
        xmlhttp.setRequestHeader("Accept-Language", httpSend.requestHeader["Accept-Language"]);

    if( httpSend.requestHeader["Authorization"] != undefined )
        xmlhttp.setRequestHeader("Authorization", httpSend.requestHeader["Authorization"]);

    xmlhttp.send(formData);
}

// HTTP 헤더 설정 함수
httpSend.setRequestHeader = function(key, value) {
    var allowHeader = ["Content-Type", "Accept", "Accept-Language", "Authorization"];
    if( allowHeader.indexOf(key) >= 0 ) {
        if( key == "Content-Type" ) {
            if( value != "application/x-www-form-urlencoded" && value != "application/json" )
                throw "Content-Type should be 'application/x-www-form-urlencoded' or 'application/json'";
        }
        httpSend.requestHeader[key] = value;
    }
    else {
        var allowHeaders = "";
        for(var i=0; i<allowHeader.length; i++) {
            if(i == 0) allowHeaders = allowHeader[i];
            else allowHeaders += " / " + allowHeader[i];
        }
        throw "key '"+key+"' is not allowed header ("+allowHeaders+")";
    }
}

httpSend.removeRequestHeader = function(key) {
    delete httpSend.requestHeader[key];
}

httpSend.clearRequestHeader = function() {
    httpSend.requestHeader = [];
}
