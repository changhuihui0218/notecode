const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const user = require('../controllers/user')
// 前缀路由前缀 后面就不要写这个东西了
router.prefix('/user')

router.post('/login', user.login);
router.get('/list',)


module.exports = router
