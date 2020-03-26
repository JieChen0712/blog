'use strict';

const common = require('../common');
const upload = require('../upload');
const upload_type = {
  avatar: '../uploads/avatar',
  article: '../uploads/article',
  normal: '../uploads/normal',
}

exports.upload_img = (req, res, next, type) => {
  console.log(11111111)
  upload.uploadFolder = upload_type[req.query.type]; // 自定义路径
  upload.uploadFolder = 'ueditor'; // 自定义路径
  upload.createFolder(upload.uploadFolder); // 创建自定义路径文件
  var up = upload.mult.single('ueditor'); // 创建上传的multer对象
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
          info: resUpload,
          msg: "上传成功"
        };
        return result_info;
//      res.setHeader('Content-Type', 'text/html')
//      res.send(result_info)
//      
//      let result_info = {
//        imageUrl: resUpload.path,
//        imagePath: resUpload.destination,
//        imageFieldName: resUpload.fieldname,
//        imageMaxSize: resUpload.size,
//        imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
//      }
//      common.responseJSON(res, result_info);
//      res.send(req.file);
//      console.log(req.file);
//      console.log(req.body);
      }
    }
  });
}


exports.upload = async(req, res, next) => {
  let ActionType = req.query.action
  let result = ''
  if(ActionType == "config"){
    res.setHeader('Content-Type', 'application/json');
    console.log(11)
    res.redirect('/ueditor/jsp/config.json');
  } else if (ActionType == "uploadimage") {
    result = await upload_img(req, res, next, 1)
    result = {
      "state": "SUCCESS",
      "url": result.info.path,
      "title": result.info.filename,
      "original": result.info.originalname
    }
    res.setHeader('Content-Type', 'text/html')
    res.send(result)
  } else if (ActionType == "uploadfile") {
    result = await upload_img(req, res, next, 2)
    result = {
      "state": "SUCCESS",
      "url": result.info.path,
      "title": result.info.filename,
      "original": result.info.originalname
    }
    res.setHeader('Content-Type', 'text/html')
    res.send(result)
  } else if (ActionType == "uploadvideo") {
    console.log('uploadvideo start')
    res.send(result)
  }
}