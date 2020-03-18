'use strict';

const common = require('../common');
const sql = require('../sqlMap'); // sql语句集
const table = 'article';
const tableKind = 'article_kind';

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
exports.add_kind = async (req, res, fields) => {
  let result_info = {};
  let timestamp = common.getTime();
  
  let order = req.body.order;
  let name = req.body.name;
  let status = req.body.status;
  let uid = req.body.uid;
  let pid = req.body.pid;
  let img = req.body.img;
  
  if(common.empty(name)||common.empty(img)){
    result_info = {
      code: -1,
      msg: '填写信息不完整',
      info: null
    }
    common.responseJSON(res, result_info);
    return;
  }
  
  let save = [{
    name: 'order',
    value: common.empty(order)?0:order
  },{
    name: 'name',
    value: name
  },{
    name: 'status',
    value: common.empty(status)?1:status
  },{
    name: 'uid',
    value: common.empty(uid)?0:uid
  },{
    name: 'pid',
    value: common.empty(pid)?0:pid
  },{
    name: 'img',
    value: img
  },{
    name: 'time',
    value: timestamp
  }];
  
  let sqlstr = sql.add(tableKind, save);
  let result = await common.excSql(sqlstr);
  
//let result = await common.excSql(`INSERT INTO \`article_kind\`  ( \`order\`,  \`name\`,  \`status\`,  \`uid\`,  \`pid\`,  \`img\` ) VALUES ( 0,  '18319579275',  null,  0,  0,  '/upload/img/123.jpg' ) ;`);
//console.log(result == false);
  if(!common.empty(result.insertId)){
    result_info = {
      code: 1,
      msg: '添加成功！',
      info: result,
    };
  }else{
    result_info = {
      code: -1,
      msg: '添加失败！',
      info: [],
    };
  }
  common.responseJSON(res, result_info);
//console.log(result);
//return false;
//
//common.getLink(sql.article.add_kind, params, (err, result) => {
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
// 文章分类列表接口
exports.article_kind = async ( req, res, fields) => {
  let name = req.body.name;
  let page_list_num = req.body.page_list_num;
  let page = req.body.page;
  let pid = req.body.pid;
  let where = [];
  
  if(common.empty(page)){
    page = 1;
  }
  if(common.empty(page_list_num)){
    page_list_num = 20;
  }
  
  if(!common.empty(name)){
    where.push({
      name: 'name',
      value: name,
      symbols: 'like',
    })
  }
  
  if(common.empty(pid)){
    pid = '0';
  }
  where.push({
    name: 'pid',
    value: pid,
    symbols: 'eq',
  })
  
  let sqlstr = sql.select(tableKind , null, where);
  let count_sqlstr = sql.count(tableKind, where);
  let count = await common.fieldSql(count_sqlstr);
  count = common.empty(count)?0:count;
  
  sqlstr += " LIMIT " + ((page - 1) * page_list_num) + ','+ (page * page_list_num) + ';';
  
  let list = await common.excSql(sqlstr);
  for(let i in list){
    list[i]['time'] = common.formatDate(list[i]['time'],"YYYY-MM-dd");
    list[i]['hasChildren'] = true;
  }
  let result_info = {
    code: 1,
    msg: '获取成功！',
    info: list,
    total: count
  };
  common.responseJSON(res, result_info);
  
}

// 文章分类状态接口
exports.kind_status_change = async ( req, res, fields) => {
  let kindId = req.body.id;
  let where = [];
  let data = [];
  let result_info;
  
  if(!common.empty(kindId)){
    where.push({
      name: 'id',
      value: kindId,
      symbols: 'eq',
    })
  }
  let findsqlstr = sql.find(tableKind, null, where);
  
  let kindInfo = await common.findSql(findsqlstr);
  
  if(kindInfo){
    let oStatus = 1;
    if(kindInfo['status'] === 1){
      oStatus = 2
    }
    data.push({
      name: 'status',
      value: oStatus
    });
    
    let sqlstr = sql.save(tableKind, data, where);
    let resSave = await common.excSql(sqlstr);
    
    result_info = {
      code: 1,
      msg: '修改成功！',
      info: resSave,
    };
  }else{
    result_info = {
      code: -1,
      msg: '无该分类信息！',
      info: [],
    };
  }
  common.responseJSON(res, result_info);
  
}

// 文章分类删除接口
exports.kind_del = async ( req, res, fields) => {
  let kindId = req.body.id;
  let where = [];
  let childWhere = [];
  let childData = []
  let result_info;
  
  if(!common.empty(kindId)){
    where.push({
      name: 'id',
      value: kindId,
      symbols: 'eq',
    })
  }
  let findsqlstr = sql.find(tableKind, null, where);
  let kindInfo = await common.findSql(findsqlstr);
  
  if(kindInfo){
    childWhere.push({
      name: 'pid',
      value: kindId,
      symbols: 'eq',
    });
    childData.push({
      name: 'pid',
      value: kindInfo['pid']
    })
    
    let childsqlstr = sql.save(tableKind, childData, childWhere);
    common.excSql(childsqlstr);
    
    let sqlstr = sql.delete(tableKind, where);
    let res_delete = await common.excSql(sqlstr);
    
    result_info = {
      code: 1,
      msg: '删除成功！',
      info: res_delete,
    };
    
  }else{
    result_info = {
      code: -1,
      msg: '无该分类信息'
    }
  }
  common.responseJSON(res, result_info);
  
}