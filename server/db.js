const mysql = require('mysql')
const pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'blog',
    multipleStatements: true
});

//pool.config.queryFormat = function (query, values) {
//if (!values) return query;
//return query.replace(/\:(\w+)/g, function (txt, key) {
//  if (values.hasOwnProperty(key)) {
//    return this.escape(values[key]);
//  }
//  return txt;
//}.bind(this));
//};

module.exports = pool;