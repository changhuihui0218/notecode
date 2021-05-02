const router = require('koa-router')()
const student= require('../controllers/student')
let {AuthToken} = require('../auth/index') 

router.prefix('/student')


router.get('/detail', student.getUserDetail)
router.get('/score', student.getUserScore)

module.exports = router
