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

exports.article_kind = ( req, res, fields) => {
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
  let count = 0;
  common.getLink(count_sqlstr, [], (err, result) => {
    if(err) {
      res.send(err);
    } else {
      count = result[0]['count'];
    }
  })
  
  sqlstr += " LIMIT " + ((page - 1) * page_list_num) + ','+ (page * page_list_num) + ';';
  common.getLink(sqlstr, [], (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(!common.emptyArray(result)){
        for(let i in result){
          result[i]['time'] = common.formatDate(result[i]['time'],"YYYY-MM-dd");
          result[i]['hasChildren'] = true;
        }
      }
      let result_info = {
        code: 1,
        msg: '获取成功！',
        info: result,
        total: count
      };
      common.responseJSON(res, result_info);
    }
  });
}

exports.kind_status_change = ( req, res, fields) => {
  let kindId = req.body.id;
  let where = [];
  let data = [];
  
  if(!common.empty(kindId)){
    where.push({
      name: 'id',
      value: kindId,
      symbols: 'eq',
    })
  }
  let findsqlstr = sql.find(tableKind, null, where);
  common.getLink(findsqlstr, [], (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(!common.emptyArray(result)){
        if(result[0]['status'] === 1){
          data.push({
            name: 'status',
            value: 2
          });
        }else{
          data.push({
            name: 'status',
            value: 1
          });
        }
        let sqlstr = sql.save(tableKind, data, where);
        common.getLink(sqlstr, [], (err, result1) => {
          if(err) {
            res.send(err);
          } else {
            let result_info = {
              code: 1,
              msg: '修改成功！',
              info: result1,
            };
            common.responseJSON(res, result_info);
          }
        })
      }else{
        let result_info = {
          code: -1,
          msg: '参数错误！',
          info: result,
        };
        common.responseJSON(res, result_info);
      }
    }
  })
}


exports.kind_del = ( req, res, fields) => {
  let kindId = req.body.id;
  let where = [];
  let childWhere = [];
  let childData = []
  let data = [];
  
  if(!common.empty(kindId)){
    where.push({
      name: 'id',
      value: kindId,
      symbols: 'eq',
    })
  }
  let findsqlstr = sql.find(tableKind, null, where);
  common.getLink(findsqlstr, [], (err, result) => {
    if(err) {
      res.send(err);
    } else {
      if(!common.emptyArray(result)){
        childWhere.push({
          name: 'pid',
          value: kindId,
          symbols: 'eq',
        });
        childData.push({
          name: 'pid',
          value: result[0]['pid']
        })
        let childsqlstr = sql.save(tableKind, childData, childWhere);
        common.getLink(childsqlstr, [], (err, result1) => {
          if(err) {
            res.send(err);
          } else {
            let sqlstr = sql.delete(tableKind, where);
            common.getLink(sqlstr, [], (err, result) => {
              if(err) {
                res.send(err);
              } else {
                let result_info = {
                  code: 1,
                  msg: '删除成功！',
                  info: result,
                };
                common.responseJSON(res, result_info);
              }
            })
          }
        });
      }else{
        let result_info = {
          code: -1,
          msg: '删除失败！',
          info: result,
        };
        common.responseJSON(res, result_info);
      }
    }
  })
}