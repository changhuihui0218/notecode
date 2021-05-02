const router = require('koa-router')()
const instructor= require('../controllers/instructor')
let {AuthToken} = require('../auth/index') 

router.prefix('/instructor')


router.get('/detail', instructor.getUserDetail)
router.get('/getStudentList', instructor.getStudentList)
router.get('/upStudent', instructor.updateStudent)
router.get('/delStudent', instructor.delStudent)
router.get('/addStudent', instructor.addStudent)
router.get('/getScoreAll', instructor.getScoreAll)
router.get('/calTask', instructor.calTask)
router.get('/calClass', instructor.calClass)

module.exports = router
