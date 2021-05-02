const router = require('koa-router')()
const teacher= require('../controllers/teacher')
let {AuthToken} = require('../auth/index') 

router.prefix('/teacher')


router.get('/detail', teacher.getUserDetail)
router.get('/score', teacher.getUserScore)
router.get('/upScore', teacher.upScore)
router.get('/addScore', teacher.addScore)
router.get('/isSameUser', teacher.isSameUser)
router.get('/totalScore', teacher.totalScore)
router.get('/delScore', teacher.delScore)
module.exports = router
