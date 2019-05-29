const mysql = require('mysql')
const pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'blog',
    multipleStatements: true
});

module.exports = pool;