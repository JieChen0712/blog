'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集

exports.add = (req, res, fields) => {
  let result_info = {};
  let timestamp = (new Date()).getTime();
  let params = [
    req.session.user.id,
    req.body.title,
    req.body.kind,
    req.body.status,
    req.body.ueContent,
    req.body.disc,
    req.body.imgurl,
    timestamp
  ];
  common.getLink(sql.article.add, params, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(result.affectedRows){
        result_info = {
          code: 1,
          msg: '添加成功！',
          info: null
        };
      }else{
        result_info = {
          code: 1,
          msg: '添加失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}
