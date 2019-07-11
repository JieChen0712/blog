'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
const table = 'article';

// 添加文章

exports.add = (req, res, fields) => {
	let result_info = {};
	let data = [{
		name: 'uid',
		value: req.session.user.id
	},{
		name: 'title',
		value: req.body.title,
	},{
		name: 'kind',
		value: req.body.kind
	},{
		name: 'status',
		value: req.body.status
	},{
		name: 'ueContent',
		value: req.body.ueContent
	},{
		name: 'disc',
		value: req.body.disc
	},{
		name: 'imgurl',
		value: req.body.imgurl
	},{
		name: 'time',
		value: (new Date()).getTime()
	}];
	let sqlstr = sql.add(table, data);
	common.getLink(sqlstr, [], (err, result) => {
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
	let where = [{
		name: 'id',
		value: req.body.art_id,
		link: 'and'
	},{
		name: 'uid',
		value: req.session.user.id,
	}];
	let data = [{
		name: 'title',
		value: req.body.title
	},{
		name: 'kind',
		value: req.body.kind
	},{
		name: 'status',
		value: req.body.status
	},{
		name: 'ueContent',
		value: req.body.ueContent
	},{
		name: 'disc',
		value: req.body.disc
	},{
		name: 'imgurl',
		value: req.body.imgurl
	},{
		name: 'time',
		value: req.body.time
	}];
	
	let sqlstr = sql.save(table, where, data);
	common.getLink(sqlstr, [], (err, result) => {
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
  });
}
//exports.add = (req, res, fields) => {
//let result_info = {};
//let timestamp = (new Date()).getTime();
//let params = [
//  req.session.user.id,
//  req.body.title,
//  req.body.kind,
//  req.body.status,
//  req.body.ueContent,
//  req.body.disc,
//  req.body.imgurl,
//  timestamp
//];
//common.getLink(sql.article.add, params, (err, result) => {
//  if(err) {
//    res.send(err);
//  } else {
//    if(result.affectedRows){
//      result_info = {
//        code: 1,
//        msg: '添加成功！',
//        info: null
//      };
//    }else{
//      result_info = {
//        code: -1,
//        msg: '添加失败！',
//        info: null
//      };
//    }
//  }
//  common.responseJSON(res, result_info);
//})
//}

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
