const user = require('../models/userModel')
let {createToken} = require('../auth/index');

module.exports= {
    goLogin: async function(ctx,next) {
        let {username,password} = ctx.request.body;
        if(username=='' || password=='') {
            alert('用户名或者密码不能为空');
        }else {
            let results = await user.getUser(username,password);
            if(results.length >0) {
               let payload={
                    userId:Math.random(),
                    username
               }
               var token = createToken(payload); 
               ctx.body= {
                   state: 'success',
                   root: results[0].value,
                   user: results[0],
                   token
               }
            }else {
                ctx.body = {
                    state: 'fail',
                }
            }
        }
    }
}