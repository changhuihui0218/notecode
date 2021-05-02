const { query } = require('./db');
const db = require('./db');
module.exports = {
    getStudentDetail: function(name) {
        console.log(name)
        return db.query("select * from root,teacher,academy,task_course,course where teacher.tnum = name and  teacher.anum=academy.anum and teacher.tnum= task_course.tnum and task_course.cnum=course.cnum and name=?",name); 
    },
    getStudentScore: function(name) {
        console.log(name)
        return db.query("select * from teacher, task_course,course_score,student where teacher.tnum=task_course.tnum and course_score.cnum=task_course.cnum and course_score.snum=student.snum and teacher.tnum=?",name); 
    },
    updateScore: function(score,snum,tnum) {
        return db.query("update course_score set score=? where snum=? and cnum= (select cnum from task_course,teacher where teacher.tnum=task_course.tnum and teacher.tnum=?)",[score,snum,tnum]); 
    },
    insertScore: function(snum,score,cnum){
        return db.query('insert into course_score set ?',{snum,score,cnum})
    },
    isSameUser: function(snum,sname){
        return db.query('select * from student where snum=? and sname=?',[snum,sname])
    },
    totalScore : function(min,max) {
        return db.query();
    },
    delScore: function(snum,cnum) {
        return db.query('delete from course_score where snum=? and cnum=?',[snum,cnum])
    }
}