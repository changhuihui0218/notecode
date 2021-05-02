const router = require('koa-router')()
const user= require('../controllers/user')

router.prefix('/user')


router.post('/login', user.goLogin)

module.exports = router
