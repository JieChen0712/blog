'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
const upload = require('../upload');
const upload_type = {
  avatar: '../dist/uploads/avatar',
  article: '../dist/uploads/article',
  normal: '../dist/uploads/normal',
}

exports.upload_img = (req, res, next) => {
//	console.log(req);
  upload.uploadFolder = upload_type[req.query.type]; // 自定义路径
  upload.uploadFolder = '../dist/uploads/avatar'; // 自定义路径
  upload.createFolder(upload.uploadFolder); // 创建自定义路径文件
  var up = upload.mult.single('avatar'); // 创建上传的multer对象
  up(req, res, function(err) { // 上传实例
//  console.log(req.body)
    if(err) {
      throw err;
      return;
    } else {
      if(req.file) {
        let result_info = {
          code: 1,
          msg: '获取成功！',
          info: req.file
        };
        common.responseJSON(res, result_info);
//      res.send(req.file);
//      console.log(req.file);
//      console.log(req.body);
      }
    }
  });
}
