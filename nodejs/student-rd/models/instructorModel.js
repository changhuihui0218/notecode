const db = require('./db');
module.exports = {
    getStudentDetail: function(inum) {
        return db.query("select * from instructor,academy where academy.anum=instructor.anum and inum=?",inum); 
    },
    getStudentList: function(inum) {
        return db.query("select * from instructor,student,academy,class where student.anum=academy.anum and student.classnum=class.classnum and  instructor.grade=student.grade and instructor.inum=?",inum); 
    },
    updateStudent: function(snum,sname,sex,birth,address,dorm,stele,aname,grade,classname) {
        return db.query("update student set sex=?,birth=?,address=?,dorm=?,stele=?,anum= (select anum from academy where aname=?),grade=?,classnum= (select classnum from class where classname=?)where snum=? and sname=? ",[sex,birth,address,dorm,stele,aname,grade,classname,snum,sname]); 
    },
    delStudent: function(snum) {
        return db.query("delete from student where snum=?",snum)
    },
    addStudent: function(sname,snum,sex,birth,address,dorm,stele,aname,grade,classname) {
        return db.query("insert into student set sname=?,snum=?,sex=?,birth=?,address=?,dorm=?,stele=?,anum= (select anum from academy where aname=?),grade=?,classnum= (select classnum from class where classname=?) ",[sname,snum,sex,birth,address,dorm,stele,aname,grade,classname]);
    },
    getScoreAll: function(inum) {
        return db.query("select student.sname,course_score.snum,course.cname,score from student,instructor,course_score,course where instructor.grade= student.grade and student.snum=course_score.snum and course.cnum= course_score.cnum and instructor.inum =?",inum)
    },
    calTask:function(cname) {
        return db.query("select sname,course_score.snum,course.cname,score from course_score,course,student where student.snum=course_score.snum and course.cnum=course_score.cnum and course.cname=?",cname);
    },
    calClass:function(classname) {
        return db.query("select sname,course_score.snum,course.cname,score from student,class,course_score,course where student.classnum=class.classnum and student.snum=course_score.snum and course.cnum=course_score.cnum and class.classname=?",classname);
    }
}