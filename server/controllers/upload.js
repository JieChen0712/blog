'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
const upload = require('./upload');
const upload_type = {
  avatar: 'avatar',
  article: 'article',
}

exports.upload_img = (req, res, next) => {
  upload.uploadFolder = upload_type[req.body.type]; // 自定义路径
  upload.createFolder(upload.uploadFolder); // 创建自定义路径文件
  var up = upload.mult.single('avatar'); // 创建上传的multer对象
  up(req, res, function(err) { // 上传实例
    if(err) {
      throw err;
      return;
    } else {
      if(req.file) {
        res.send(req.file);
        console.log(req.file);
        console.log(req.body);
      }
    }
  });
}
