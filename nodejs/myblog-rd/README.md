
## 开发过程
遇到跨域问题

1、直接百度koa遇到跨域问题的解决方法
```
    // 处理跨域  use一次 执行一个中间件 ---先解决跨域的问题
    app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*") // 在ctx上下文中 设置可以访问的源
    await next() // next用来继续执行下一个中间件
    })
```
2、CORS
```
    1、npm install koa-cors
    2、 app.js中配置
        var cors = require('koa-cors');
        app.use(cors());
```

get和post传参数的区别?
非简单请求
    post('xxxxxx',{
        name:'lis',
        age:12,   //request-preload发送预检请求
    },
    ) 
    
    content-type:application/json
    先发一个预检请求，看是否能够访问这个域，options 不带数据，只是发送源，测试一个源接不接收，如果接收就返回一个允许的源 （默认发送）
    然后再发post正式的请求

     this.axios({
         methods:'post',
         url: 'http://localhost:3000',
         data: {
           name:'lisi',

         },
         header: {
           "Content-type": 'application/x-www-form-urlencoded'
         }
       })
       可以发送参数，但是不需要两个请求了也能传输json,
       或者：增加一个Max-age有效期
面试官 什么是cors
作用：
两种：
    我在工作中用非简单请求，请求数据的时候用apllication/json,然后发送两个请求 一个预检请求+正式请求
    除了指定在header之外的字段一定是非简单请求


允许有条件的访问，但是不能
只能是先登录，才允许访问
token---jwt(json web token 令牌)
登录注册页面不需要令牌
有些页面需要

方式：
    登录页面
    成功后，在服务器端生成token，返回给客户端
    在客户端存起来 比如localstorage、cookie、vuex
    然后每一次请求的时候 都带着这个令牌去放在请求头里
    服务器接收 对比之前的token
        1、没有令牌
        2、有但是过期   强制返回到登陆页面中
        3、有没有过期，成功
做法：
    1、在后端
        安装 jsonwebtoken: npm install jsonwebtoken
    2、在前端写一个静态的登录样式、配置一个路由，引入进来
       写一个首页，在登录进来的时候展示，配置一个路由
    3、现在针对登录页面是对于所有人都展示的
       首页是有限制的，必须是传过来token后才可以展示
    
    1、页面跳转：不是通过form提交：点击提交按钮 ，然后post方式请求提交表单，页面跳转 post/login中控制期接收数据
    进入路由后，匹配到user中的login方法
    2、使用异步的方式：
        前端：使用ajax 传参数路径以及后端的路由
        后端：在对应的路由中写相应的功能，返回处理后的数据
    登录后跳转到首页 前端的代码中直接跳转到首页
    但是数据是要从服务器中请求出来  所以需要行鉴权token
token的流程

怎么控制哪一次请求带不带token ,拦截（axios）?
生成token？
  1、安装 jsonwebtoken: npm install jsonwebtoken
  2、引入jwt
     var jwt = require('jsonwebtoken');
     var token = jwt.sign(payload,secretKey,{expiresIn:120})
     var token = jwt.sign({ foo: 'bar' }, 'shhhhh'); //相当于算法
  3、payload:对象 用来放token的签名信息，每个人的token不一样
    let payload = {
        userId, //现在可以随机数
        username,
    }  //里面的参数可以写任意个
    secretKey:随便写
    expiresIn:120 token过期时间，以s为单位
返回给客户端：
    ctx.body{token}
客户端：先判断是否登录成功，然后再判断行鉴权，存储在local storage

1、先存储在vuex中
    1、在vuex中state中定义：token:''
    2、mutation: 
    3、action:设置一个方法 setToken(state,token)=> {
        state.token =token
        localStorage.setItem('mytoken',token)
    }
在获取token的时候，this.$dispatch('setToken',token)

以后发送的时候带token?
this.axios({
    url:'xxxxx',
    header: {
        'Authorization': localStorage.getItem('mytoken')
    }
})

怎么检查是否带token?
router.get(url,f1,f2,f3)
f1= async(ctx ,next)=>{
    await next();
}

async(ctx,next)=>{
    if(ctx.header.authorization) {
        let token = ctx.header.authorization;
        console.log(auth);
        try{
            // 验证token
            jwt.verify(token,secretKey);
            await next();
        }catch{
            // error
            ctx.status=401;
            ctx.body= 'token不存在或者已经过期'
        }
    }
},
async(ctx,next)=>{
    
},

token的优化
1、封装成一个函数
2、所有的返回的body都要变成一个对象
对行鉴权失效的判断 401
在后端中try catch中返回的错误是在前端的catch中获取到的


ctx 是将request和response的封装 koa里的执行上下文
request 可以通过ctx.xx来获取隐式的一些信息 （相当于ctx.request.xxx）
        可以通过包体获取的一个显示的信息
response 


封装http-axios
每一次都得自己去配一下 带token (太麻烦了)或者 自己可以通过axios中有个拦截器

vue-axios 插件直接封装好 在vue中直接用this.axios({})
可以自己封装一个
全局默认的---针对所有
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
创建实例---在一个项目中可以有多个实例，配置不同的信息url,token 
    // Set config defaults when creating the instance
    const instance = axios.create({
    baseURL: 'https://api.example.com'
    });

    // Alter defaults after instance has been created
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
拦截器----在发送请求之前，先经过拦截器中的代码
          在响应回来后，先经过拦截器的处理
先在pc端新建一个文件夹 utils(功能模块)
     1、http.js
        ```
            const instance = axios.create({
                baseURL: 'http://localhost:3000',
                timeout: 60000
            });

            //添加请求拦截器
            instance.interceptors.request.use(
                function(config) {
                    // 在发送之前做些什么------带上token
                    let token = localStorage.getItem('mytoken');
                    config.headers['Authorization'] = token;
                    return config;
                },
                function(error) {
                    // 对请求错误做些什么
                    return Promise.reject(error);
                }
            )

            // 前端是es6的模块开发
            export default instance;
        ```
    2、在main.js中一次性引入，不用每个文件文件的引入
    ```
        // import VueAxios from 'vue-axios'  //防止混淆 
        import http from './utils/http'
        // Vue.use(VueAxios, axios)
        Vue.prototype.$http = http; //$http自己命名 规范 在vue原型下加载东西的时候，变量名用$开头
    ```
    3、改造代码
        引入this.$http({xxxx})、地址省略、header去掉

在拦截器中header的token前面加一个"Bearer "+token
    1、config.headers['Authorization'] = "Bearer "+token; 
    2、jwt.verify(token,secretKey)验证的时候肯定不对
        分割：
         let part = ctx.header.authorization.split(' ');
      let bearer = part[0];
      let token = part[1];
      if(/^Bearer$/.test(bearer)){
        try{
          jwt.verify(token,secretKey);
          await next();
        } catch(err){
          ctx.status=401;//没有授权 服务器返回401
          ctx.body={
            state:'autoFail',
          }
        }
      } 
    本身无意义，送信人，其实叫什么都可以

问题：
    服务器收到token时验证：是自己产生token，自己复制了一份，然后传给客户端？
    是的 存哪里了？

鉴权的时候 jwt token------是无状态的 不会在服务器存储，存储在客户端？-----适合多端登录
                        是验证不是比对，加密的算法生成
                        verify()是用来解码的，看是否能够解码成功
            token生成了，服务器端重启？token还有效
          session+Cookie----有状态存储在服务器端（放在内存条中）---常用的方式：存储在数据库  ---单点登录（记录状态）
          (服务器端产生一个sessionId,存储在cookie （量小，明文需要加密）中)
            session在服务器重启的时候，就会失效（有会话期，浏览器一关闭session就没有）

点击连接和地址栏中直接输入？他都只是通过？传参数 /
、、


数据库连接
在控制器中写代码
    1、接收数据
    2、验证
    3、调数据库
    4、跳转

创建项目
    1、先下载koa-generator
    2、下载项目 koa2 项目名
    3、npm install
    4、启动：npm start
    5、修改使用 pug-->ejs(要下载npm install ejs)






    
