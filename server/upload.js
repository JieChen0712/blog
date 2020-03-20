const common = require('./common');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

/**
 * 创建文件夹,用于上传文件
 */
let createFolder = (folder) => {
    try {
        fs.accessSync(folder);
    }
    catch (e) {
        fs.mkdirSync(folder);
    }
}

let uploadFolder = '/uploads/';
let basePath = '..';
createFolder(basePath + uploadFolder);

let storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, upload.baseFolder + upload.uploadFolder);
//  cb(null, path.join(__dirname, upload.baseFolder + upload.uploadFolder));
  },
  filename: function(req, file, cb) {
    let fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + common.randomCode(false,5) + '.' + fileFormat[fileFormat.length - 1]);
  }
});

let upload = {
  mult: multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      let extArr = ['.jpg', '.jpeg', '.gif', '.png'];
      if (!extArr.includes(ext)) {
        cb(null, false);
//      cb(new Error('扩展名不正确'));
      }else{
        cb(null, true);
      }
    }
  }),
  uploadFolder: 'normal',
  basePath: '..',
  baseFolder: '../uploads/',
  createFolder: (folder) => {
    if(folder){
      folder = upload.baseFolder + folder + '/';
    }else{
      folder = upload.baseFolder + upload.basePath + upload.uploadFolder + '/';
    }
    try {
      fs.accessSync(folder);
    } catch(e) {
      fs.mkdirSync(folder);
    }
  }
};

//upload.createFolder(upload.uploadFolder);

module.exports = upload;