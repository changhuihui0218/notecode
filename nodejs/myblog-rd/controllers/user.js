const userModel = require('../models/userModel')
let {createToken} = require('../auth/index');
module.exports= {
    login: async function (ctx, next) {
        /*
            1、接数据
                如果是用post-------ctx.request.body;
                如果是用get--------ctx.query/params.body;
                如果是用？传递------ctx.query.body;
                如果是用/ 传递------ctx.params.body;     
        */
        let {username,password} = ctx.request.body;
        /*
            2、验证
             如果用户名没有填 ctx.body传递一个fail,给一个信息message提示一下信息
        */
       /*
            3、连接数据库---调用model
       */
        let result = await userModel.getByNameAndPwd(username,password);
        console.log('哈哈哈哈哈',result);
        if(result.length>0) {
             //登录成功
            let payload={
                userId:Math.random(),
                username
            }
            var token = createToken(payload); 
            // console.log(token)
            ctx.body = {
                state:'success',
                token,
                user: result[0]
            }
            // ctx.body = {
            // } //服务器端向客户端返回的res
        } else{
          ctx.body = 'fail'
        }
    },
}