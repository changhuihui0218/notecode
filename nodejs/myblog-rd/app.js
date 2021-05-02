const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser') //处理表单
const logger = require('koa-logger')
var cors = require('koa-cors');

const blog = require('./routes/blog')
const users = require('./routes/users')

// // 处理跨域  use一次 执行一个中间件 ---先解决跨域的问题
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*") // 在ctx上下文中 设置可以访问的源
//   await next() // next用来继续执行下一个中间件
// })

// kua-cors处理跨域
app.use(cors());


// error handler
onerror(app)


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
