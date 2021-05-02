const student = require('../models/studentModel')

module.exports = {
    // 获取用户的信息
    getUserDetail: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await student.getStudentDetail(userId);
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

    // 获取用户成绩
    getUserScore: async function(ctx,next) {
        let {userId} = ctx.query;
        let results = await student.getStudentScore(userId);
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

    }
}
