const models = require('./db'); // 引用mysql的配置连接数据库
const express = require('express'); // 使用express框架
const router = express.Router(); // 开启路由
const sql = require('./sqlMap'); // sql语句集
const md5 = require('js-md5'); // md5加密验证
const upload = require('./upload');
const fs = require('fs');

// 响应请求的json数据模板
const responseJSON = (res, ret) => {
    if(typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '请求失败！'
        });
    } else {
        res.json(ret);
    }
};



// 用户登录接口
router.post('/api/login/check_login', (req, res, fields) => {
    models.getConnection((err, conn) => {
        conn.query(sql.user.query_user, [req.body.ac, md5(req.body.pd)], (err, result) => {
            if(err) {
                res.send(err);
            } else {
                if(Object.keys(result).length == 0) {
                    result_info = {
                        code: 0,
                        info: null,
                        msg: "暂无数据"
                    };
                } else {
                    result_info = {
                        code: 1,
                        info: result,
                        msg: "获取成功"
                    }
                }
                responseJSON(res, result_info);
                //              res.send(result_info);
            }
            conn.release();
        });
    });
});

// 上传文件接口
router.post('/api/img/upload', function(req, res, next) {
    upload.uploadFolder = '../uploads/avatar'; // 自定义路径
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
router.get('/api/login/getAccount',requireLogin, (req, res, fields) => {
    // 通过模型去查找数据库
    models.getConnection((err, conn) => {
        conn.query(sql.common.select_all, ['admin'], (err, result) => {
            if(err) {
              console.log(req.sessionID);
                res.send(err);
            } else {
              console.log(req.sessionID);
                responseJSON(res, result);
                //              res.send(result);
            }
            conn.release();
        });
    });
});

// 用户信息修改接口
router.post('/api/user/set_user_detail', requireLogin, (req, res, fields) => {
//  console.log(req);
//  res.send(req.body.address);
    console.log([
                req.body.nickname, 
                req.body.sex, 
                req.body.phone, 
                req.body.qq, 
                req.body.wechat, 
                req.body.email, 
                req.body.introduct, 
                req.body.province, 
                req.body.city, 
                req.body.county, 
                req.body.address, 
                req.body.brith_day, 
                md5(req.body.uid)
            ]);
    models.getConnection((err, conn) => {
        conn.query(sql.user.set_user_detail,
            [
                req.body.nickname, 
                req.body.sex, 
                req.body.phone, 
                req.body.qq, 
                req.body.wechat, 
                req.body.email, 
                req.body.introduct, 
                req.body.province, 
                req.body.city, 
                req.body.county, 
                req.body.address, 
                req.body.brith_day, 
                req.body.uid
            ], (err, result) => {
            if(err) {
                res.send(err);
            } else {
                if(Object.keys(result).length == 0) {
                    result_info = {
                        code: 0,
                        info: null,
                        msg: "修改失败"
                    };
                } else {
                    result_info = {
                        code: 1,
                        info: result,
                        msg: "修改成功"
                    }
                }
                responseJSON(res, result_info);
                //              res.send(result_info);
            }
            conn.release();
        });
    });
});

// 用户登录接口
router.post('/api/blog/login', (req, res, fields) => {
    models.getConnection((err, conn) => {
        conn.query(sql.user.login, [req.body.ac], (err, result) => {
            if(err) {
                res.send(err);
            } else {
                if(md5(req.body.pd)==md5(result[0]['password'])){
                    let user = {'account': req.body.ac,'name':result[0]['name'],'password':md5(result[0]['password'])};
                    req.session.user = user;
                    req.session.save();
                    res.cookie('NODESESSIONID',req.sessionID, {maxAge: 1000 * 1000});
//                  req.cookies.user = req.sessionId;
                    console.log('success login');
//                  console.log(req.sessionStore);
//                  console.log(req.session);
//                  console.log(req.sessionID);
                    result_info = {
                        code: 1,
                        info: result[0]['name'],
                        msg: "登录成功！"
                    }
                }else{
                    result_info = {
                        code: 2,
                        info: null,
                        msg: "登录失败！"
                    }
                    console.log('error login');
                }
                responseJSON(res, result_info);
            }
            conn.release();
        });
    });
});

/**
 * Middleware 用户权限校验
 */
function requireLogin (req, res, next) {
    if(req.user){
        next();
    }else{
        next(new Error('登录用户才能访问'));
    }
}

module.exports = router;