const sqlMap = {
    common: {
        select_all: 'SELECT * FROM ??'
    },
    user: {
        all_user: 'SELECT * FROM admin',
        query_username: 'SELECT * FROM admin WHERE username = ?',
        add_user: 'INSERT INTO admin(username,password) values(?,?)',
        updata_pd: 'UPDATE admin SET password = ? WHERE username = ?',
        query_user: 'SELECT * FROM admin WHERE username = ? and password = ?',
        delete_user: 'DELETE FROM admin WHERE username =?'
    }
}

module.exports = sqlMap;