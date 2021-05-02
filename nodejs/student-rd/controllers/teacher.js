const teacher = require('../models/teacherModel')

module.exports = {
    // 获取用户的信息
    getUserDetail: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await teacher.getStudentDetail(userId);
        if(results.length>0) {
            console.log(results)
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

    // 得到学生所有的成绩
    getUserScore: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await teacher.getStudentScore(userId);
        if(results.length>0) {
            console.log(results)
            ctx.body = {
                state: 'success',
                userScore: results,
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    // 修改学生成绩
    upScore: async function(ctx,next) {
        let {score,snum,tnum} = ctx.query;
        let results = await teacher.updateScore(score,snum,tnum);
        console.log(results)
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

    //添加学生成绩
    addScore: async function(ctx,next) {
        let {num,score, cnum} = ctx.query;
        let results = await teacher.insertScore(num,score,cnum);
        console.log(results)
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

    // 判断学生是否是一个人
    isSameUser: async function(ctx,next) {
        let {num,name} = ctx.query;
        let results = await teacher.isSameUser(num,name);
        console.log(results)
        if(results.length>0) {
            ctx.body = {
                state: 'success',
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    // 统计分数段
    totalScore: async function(ctx,next) {
        let {min,max} = ctx.query;
        let results = await teacher.totalScore(min,max);
        console.log(results)
        if(results.length>0) {
            ctx.body = {
                state: 'success',
            }
        }else {
            ctx.body = {
                state: 'fail'
            }
        }
    },

    // 删除成绩
    delScore: async function(ctx,next) {
        let {snum,cnum} = ctx.query;
        let results = await teacher.delScore(snum,cnum);
        console.log(results)
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

}
