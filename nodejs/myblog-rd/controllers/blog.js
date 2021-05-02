const blog = require('../models/blogModel')

module.exports = {
    postBlog: async function(ctx,next) {
        let {title,content,value} = ctx.request.body;

        let result = await blog.savePostBlog(title,content,value);
        console.log('数据库的结果',result)

        if(result.affectedRows >0){
            ctx.body= {
                state: 'success',
            }
        }else {
            ctx.body= {
                state: 'fail',
            }
        }

    }    
}