const api = require('./api');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);

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

//app.get('*',function(req,res){
//  const html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),"utf-8")
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