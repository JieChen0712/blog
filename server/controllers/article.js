'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集

// 添加文章
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
          code: -1,
          msg: '添加失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}

// 编辑文章
exports.edit = (req, res, fields) => {
  let result_info = {};
  let timestamp = (new Date()).getTime();
  let params = [
    req.body.art_id,
    req.session.user.id,
    req.body.title,
    req.body.kind,
    req.body.status,
    req.body.ueContent,
    req.body.disc,
    req.body.imgurl,
    timestamp
  ];
  common.getLink(sql.article.edit, params, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(result.affectedRows){
        result_info = {
          code: 1,
          msg: '修改成功！',
          info: null
        };
      }else{
        result_info = {
          code: -1,
          msg: '修改失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}

// 删除文章
exports.delete = (req, res, fields) => {
  let result_info = {};
  let timestamp = (new Date()).getTime();
  let params = [
    req.session.user.id,
    req.body.art_id,
    timestamp
  ];
  common.getLink(sql.article.delete, params, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(result.affectedRows){
        result_info = {
          code: 1,
          msg: '删除成功！',
          info: null
        };
      }else{
        result_info = {
          code: -1,
          msg: '删除失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}

exports.get_article = (req, res, fields) => {
  
}

// 添加分类
exports.add_kind = (req, res, fields) => {
  let result_info = {};
  let timestamp = (new Date()).getTime();
  let params = [
    req.session.user.id,
    req.body.name,
    timestamp
  ];
  common.getLink(sql.article.add_kind, params, (err, result) => {
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
          code: -1,
          msg: '添加失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}
// 编辑分类
exports.edit_kind = (req, res, fields) => {
  let result_info = {};
  let timestamp = (new Date()).getTime();
  let params = [
    req.session.user.id,
    req.body.kind_id,
    req.body.name,
    req.body.status,
    timestamp
  ];
  common.getLink(sql.article.edit_kind, params, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(result.affectedRows){
        result_info = {
          code: 1,
          msg: '修改成功！',
          info: null
        };
      }else{
        result_info = {
          code: -1,
          msg: '修改失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}
// 删除分类
exports.delete_kind = (req, res, fields) => {
  let result_info = {};
  let timestamp = (new Date()).getTime();
  let params = [
    req.session.user.id,
    req.body.kind_id,
    timestamp
  ];
  common.getLink(sql.article.delete_kind, params, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(result.affectedRows){
        result_info = {
          code: 1,
          msg: '删除成功！',
          info: null
        };
      }else{
        result_info = {
          code: -1,
          msg: '删除失败！',
          info: null
        };
      }
    }
    common.responseJSON(res, result_info);
  })
}
