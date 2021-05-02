const userModel = require('../models/useModel')

module.exports= {
   async listUsers(ctx) {
        /*
            1、接受数据
            2、验证
            3、连接数据库
            4、更具上一步数据库的结束，控制
                                提示什么样的信息
                                向哪一个页面跳转
                                重定向
        */ 
      let results= await userModel.getAllUsers();
      console.log(results[0].name)
      if(results.length>0){
          // render第一个参数是要加载或者跳转的页面，第二个参数是一个对象，对象中的属性可以传递给页面中使用
        await ctx.render('index.ejs',{
            userList:results, //xxx是页面中使用的参数
        });
      }

    }
}