const db = require('./db');
module.exports = {
    getStudentDetail: function(name) {
        console.log(name)
        return db.query("select * from root,student,academy,class where snum=name and student.anum=academy.anum and student.classnum=class.classnum and snum=?",name); 
    },
    getStudentScore: function(name) {
        console.log(name)
        return db.query("select cname, score from course, course_score where course.cnum=course_score.cnum and snum=?",name); 
    }
}