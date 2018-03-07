const multer = require('multer');
const fs = require('fs');

/**
 * 创建文件夹,用于上传文件
 */
//let createFolder = (folder) => {
//  try {
//      fs.accessSync(folder);
//  }
//  catch (e) {
//      fs.mkdirSync(folder);
//  }
//}

//let uploadFolder = '../uploads/';
//createFolder(uploadFolder);

let storage =multer.diskStorage({
   destination:function(req,res,cb){
       cb(null, upload.uploadFolder);
   },
   filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
   }
});

let upload = {
    mult : multer({ storage: storage }),
    uploadFolder : '../uploads/',
    createFolder: (folder) => {
       try {
            fs.accessSync(folder);
        }
        catch (e) {
            fs.mkdirSync(folder);
        } 
    }
};

upload.createFolder(upload.uploadFolder);

module.exports = upload;