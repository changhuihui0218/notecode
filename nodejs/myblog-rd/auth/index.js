const jwt = require('jsonwebtoken');
let secretKey='4asyfa$$';
module.exports = {
  // async 返回promise对象 但是我们需要一个字符串所以async去掉
  createToken: (payload)=>{
    return jwt.sign(payload, secretKey,{expiresIn:'1h'})
  },
  AuthToken:async (ctx, next) => {
    if(ctx.header.authorization){
      console.log(111);
      let part = ctx.header.authorization.split(' ');
      let bearer = part[0];
      let token = part[1];
      if(/^Bearer$/.test(bearer)){
        try{
          // 验证token
          jwt.verify(token,secretKey);
          await next();
        } catch(err){
          console.log('失败')
          // 不手动使用服务器返回 ----f返回一个失败是自己认为的失败，但是服务器的状态码是200成功的
          ctx.status=401;//没有授权 服务器返回401
          ctx.body={
            state:'autoFail',
          }
        }
      }
    }
  }

}