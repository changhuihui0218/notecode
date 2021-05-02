const db = require('./db');
module.exports= {
    savePostBlog: function(tname,tnum,anum) {
        return db.query(`insert into teacher set ?`,{tname,tnum,anum})
    }
}