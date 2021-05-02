const instructor = require('../models/instructorModel')

module.exports = {
    // 获取用户的信息
    getUserDetail: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await instructor.getStudentDetail(userId);
        if(results.length>0) {
            ctx.body = {
                state: 'success',
                userDetail: results[0],
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    // 获取所有学生的信息
    getStudentList: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await instructor.getStudentList(userId);
        if(results.length>0) {
            ctx.body = {
                state: 'success',
                userDetail: results,
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    // 修改学生信息
    updateStudent: async function(ctx,next) {
        let {snum,sname,sex,birth,address,dorm,stele,aname,grade,classname} = ctx.query;
        let results = await instructor.updateStudent(snum,sname,sex,birth,address,dorm,stele,aname,grade,classname);
        if(results.affectedRows>0) {
            ctx.body = {
                state: 'success',
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    // 删除学生的信息
    delStudent: async function(ctx,next) {
        let {snum} = ctx.query;
        let results = await instructor.delStudent(snum);
        if(results.affectedRows>0) {
            ctx.body = {
                state: 'success',
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },
    // 增加学生信息
    addStudent: async function(ctx,next) {
        let {sname,snum,sex,birth,address,dorm,stele,aname,grade,classname} = ctx.query;
        let results = await instructor.addStudent(sname,snum,sex,birth,address,dorm,stele,aname,grade,classname);
        if(results.affectedRows>0) {
            console.log('成功',results)
            ctx.body = {
                state: 'success',
            }
        }else {
            console.log('失败')
            ctx.body = {
                state: 'fail'
            }
        }
    },
    // 获取学生成绩
    getScoreAll: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await instructor.getScoreAll(userId);
        if(results.length>0) {
            ctx.body = {
                state: 'success',
                scoreList: results,
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    //获取课程的平均分
    calTask: async function(ctx,next) {
        let {cname} = ctx.query;
        let results = await instructor.calTask(cname);
        if(results.length>0) {
            ctx.body = {
                state: 'success',
                taskScoreList: results,
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },
    //获取班级的分数
    calClass: async function(ctx,next) {
        let {classname} = ctx.query;
        let results = await instructor.calClass(classname);
        if(results.length>0) {
            console.log('课程',results)
            ctx.body = {
                state: 'success',
                classScoreList: results,
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },


}
