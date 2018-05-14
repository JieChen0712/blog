const api = require('./api');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//const flash = require('connect-flash');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    name: 'user',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 1000 // 有效期，单位是毫秒
    }
}));

//app.use(passport.initialize());
//app.use(flash());
//app.use(passport.session());

// 配置允许跨域设置
app.all('*', function(req, res, next) {
    let html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),"utf-8");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(html);
        /make the require of options turn back quickly/
    } else {
        next();
    }
});

// 访问静态资源文件
app.use(express.static(path.resolve(__dirname,'../dist')));
//app.use(express.static(path.resolve(__dirname,'../dist')));
app.use(api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});
//
//// production error handler
//// no stacktraces leaked to user
app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
    message: err.message,
    error: {}
});
});

//app.get('/',function(req,res){
//  const html = fs.readFileSync(path.resolve(__dirname,'../dist/test.html'),"utf-8")
//  res.send(html)
//})

app.listen(8085);
console.log('success to listen....');


//deal (cookie,session)
(() => {
    app.use(cookieParser());
    let keyArr = [];
    for (let i = 0; i < 100000; i++) {
        keyArr[i] = "xsa_" + Math.random() * 100 + i;
    }
    app.use(cookieSession({
        name: "hc",
        keys: keyArr,
        maxAge: 30 * 60 * 1000
    }));
})();