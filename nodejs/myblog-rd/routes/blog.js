const router = require('koa-router')()
const blog= require('../controllers/blog');
let {AuthToken} = require('../auth/index');
const jwt = require('jsonwebtoken');
router.prefix('/blog')
router.get('/list', 
  AuthToken,
  async (ctx, next) => {
  let blogs= [
    {blogId:11,title: '标题1', content:'内容1',postTime:new Date()},
    {blogId:22,title: '标题2', content:'内容2',postTime:new Date()},
    {blogId:33,title: '标题3', content:'内容3',postTime:new Date()},
  ];
  ctx.body = {
    state:'success',
    blogs
  }
})

router.get('/detail', 
  AuthToken,
  async (ctx, next) => {
    let blog= {
      blog_id :ctx.query.blogId,
      title: '标题1',
      content: '内容',
      post_time: new Date()
    };
    ctx.body = {
      state:'success',
      blog
    }
})
router.post('/post', blog.postBlog)

module.exports = router
