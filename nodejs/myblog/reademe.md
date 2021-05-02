1、下载koa-generator
2、下载项目koa2 项目名
3、用ejs代替pug  app.js中修改 +下载ejs +删掉pug

使用标准的MVC这样的标准后端开发的项目结构
MVC(Model,View,Controller)
    业务逻辑代码：Controller 中的方法命名与业务规范
    数据库操作代码：Model   就是增删改查（get delete update,save）
    用户可见的页面：view
    router路由只是做简单的路由转发
数据库中有几张表，就有几个model,几个controller,router

简单的功能：
    一进来有一个标题，做一个

mysql数据库操作完的结果results，一般会有以下几种情况：
    1、如果查询不到，result=[],可以通过result.length是否大于0，来判断查没查到
    2、如果查到多条，result=[{},{},{},...]，
    3、如果查到一条，result=[{},],只有一个查询结果对象，仍然可以通过result.length是否大于0，来判断查没查到
增删改---都是对数据库的修改
    4、如果是添加记录，result返回一个对象，其中有一个insertId属性，用来获取刚刚插入的这条记录的主键值，可以通过这个值是不是>0，来判断插入是否成功
    5、如果是修改和删除记录，results返回一个对象，其中有一个affectedRows（修改的行数），可以通过这个值是不是>0,来判断删除或者修改是否成功
