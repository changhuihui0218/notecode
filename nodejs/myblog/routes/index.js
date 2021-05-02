const router = require('koa-router')()
const userController = require('../controllers/useController')

router.get('/', userController.listUsers);


module.exports = router
