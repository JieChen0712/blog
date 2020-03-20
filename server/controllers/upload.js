'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
const upload = require('../upload');
const upload_type = {
  avatar: '../uploads/avatar',
  article: '../uploads/article',
  normal: '../uploads/normal',
}

exports.upload_img = (req, res, next) => {
//	console.log(req);
  upload.uploadFolder = upload_type[req.query.type]; // 自定义路径
  upload.uploadFolder = 'avatar'; // 自定义路径
  upload.createFolder(upload.uploadFolder); // 创建自定义路径文件
  var up = upload.mult.single('avatar'); // 创建上传的multer对象
  up(req, res, function(err) { // 上传实例
//  console.log(req.body)
    if(err) {
      let result_info = {
        code: -1,
        msg: '上传失败！',
        info: err
      };
      common.responseJSON(res, result_info);
//    throw err;
//    return;
    } else {
      if(req.file) {
        let resUpload = req.file;
        // 这里去掉相对路径..和替换掉特殊字符\
        resUpload.path = resUpload.path.substr(2,resUpload.path.length).replace(/\\/g, '\/');
        let result_info = {
          code: 1,
          msg: '上传成功！',
          info: resUpload
        };
        common.responseJSON(res, result_info);
//      res.send(req.file);
//      console.log(req.file);
//      console.log(req.body);
      }
    }
  });
}
