const models = require('./db'); // 引用mysql的配置连接数据库
const express = require('express'); // 使用express框架
const router = express.Router();    // 开启路由
const sql = require('./sqlMap');   // sql语句集
const md5 = require('js-md5');  // md5加密验证
const upload = require('./upload');
const fs = require('fs');

// 响应请求的json数据模板
const responseJSON  = (res,ret) => {
    if(typeof ret === 'undefined'){
        res.json({
            code: '-200',
            msg: '请求失败！'
        });
    }else{
        res.json(ret);
    }
};

// 用户登录接口
router.post('/api/login/check_login',(req,res,fields)=>{
    models.getConnection((err,conn)=>{
        conn.query(sql.user.query_user,[req.body.ac,md5(req.body.pd)],(err,result)=>{
            if(err){
                res.send(err);
            }else{
                if(Object.keys(result).length == 0){
                    result_info = {
                        code: 0,
                        info: null,
                        msg: "暂无数据"
                    };
                }else{
                    result_info = {
                        code: 1,
                        info: result,
                        msg: "获取成功"
                    }
                }
                responseJSON (res,result_info);
//              res.send(result_info);
            }
            conn.release();
        });
    });
});


router.post('/api/img/upload',function(req,res,next){
    upload.uploadFolder = '../uploads/avatar'; // 自定义路径
    upload.createFolder(upload.uploadFolder);   // 创建自定义路径文件
    var up = upload.mult.single('avatar');    // 创建上传的multer对象
    up(req,res,function(err){        // 上传实例
       if(err){
           throw err;
           return;
       }else{
           if(req.file){
                res.send(req.file);
                console.log(req.file);
                console.log(req.body);
            }
       }
    });
    
});
// 用户注册（默认为普通用户）
//router.post('/api/login/register',(req,res) => {
//  if(req.body.ac!=""&&req.body.pw!=""){
//      models.getConnection((err,conn) => {
//         conn.
//      });
//  }
//});

// 查询所有用户接口
router.get('/api/login/getAccount',(req,res,fields) => {
    // 通过模型去查找数据库
    models.getConnection((err,conn)=>{
        conn.query(sql.common.select_all,['admin'],(err,result)=>{
            if(err){
                res.send(err);
            }else{
                responseJSON (res,result);
//              res.send(result);
            }
            conn.release();
        });
    });
});

module.exports = router;