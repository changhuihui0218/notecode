const db = require('./db');

module.exports= {
    getAllUsers() {
        // 连接数据库操作
        // return db.query('select * from xxxx where yyy=? and zzz=?' ,[yyy,zzz])
        return db.query(`select *
        from passwor`);
    },
    getUserById() {

    },
    saveUser(){

    },
    deleteUser() {

    },
    updateUser() {

    },
}