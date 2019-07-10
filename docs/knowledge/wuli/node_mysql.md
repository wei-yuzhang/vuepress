---
title: node与mysql数据交互
---

<returnHeader />

# vue-cli2 + node.js(express) + mysql数据库

## 项目简介
+ 本项目借助node提供的服务，使前端开发可以自己编写接口并连接服务，实现对数据库中数据的增、删、改、查； 故此次弄了个小demo，以供参考，有不足、改进之处，大家互相探讨学习。

## 前提准备
1. 项目开始前请先搭建好vue-cli项目，并能成功启动项目；
2. 提前写好一个组件（此页面为下面调取接口时使用），比如：登陆页面等。
3. 电脑上安装mysql数据库，（注意：mysql版本最好是5.7左右的，本人尝试了新版8.0的，结果是连接数据库失败！）
4. 准备工作做好后，就可以参照下面步骤开始项目啦！

## 项目步骤
### 1).mysql数据库表的创建
1. cmd以管理员身份运行，然后启动服务：<br/>
`net start mysql` 回车；
2. 进入mysql解压目录下的bin目录下：（我的安装目录：D:\mysql-5.7.24\bin）键入命令符：<br/>
`mysql -u root -p`    回车；<br/>
输入密码后回车；
3. `show databases;`    可以查看有哪些数据库（分号不能少！）;<br/>
   `create database user_db;`    创建库名为 user_db 的数据库;<br/>
   `use user_db;`    选中 user_db 的库进行操作;<br/>
   `create table user_tb (uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), class VARCHAR(255)) character set = utf8;`    在 user_db 库中创建名为 user_tb 的表，表里属性（uid, name, class）,且支持中文;<br/>
   `show columns from user_tb;`    查看建立的表结构;<br/>
   `insert user_tb (uid,name,class) values (1,'小明','5年1班');`    往表中插入数据;<br/>
   `select * from user_tb;`    查看表记录，如下：
   <br/>

   <imageView imageTitle="总体效果" imageUrl="/images/mysqlTb.png"/>
   <br/>
   以上，接口数据已准备完成。
   
### 2).vue项目安装相关依赖
```
npm install express,mysql,vue-resource
```

### 3).创建数据库配置文件
项目根目录下新建 server/api.js 文件；api.js 代码如下:
```js
/*** 数据库配置文件*/
const express = require('express');
const app = express();
const mysql = require('mysql');

// post请求使用（获取请求的json数据）
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// 创建链接数据库实例
const connection = mysql.createConnection(
  {
    host: 'localhost', // 数据库主机地址
    user: 'root', // 数据库账号
    password: '', // 数据库密码
    port: '3306', // 端口号
    database: 'user_db' // 链接的数据库名
  }
)

// 调用连接
connection.connect(function (err) {
  if (err) {
    console.log('[错误] - :' + err)
  } else {
    console.log('[成功] succeed!')
  }
})

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 查询-接口：getData 指定为post的http请求方法
app.post('/getData', function (req, res) {
  // 查询数据库，获取数据（通过传入的uid查询）
  let sql = 'SELECT * FROM user_tb'
  let uid = req.body.uid // get方式：req.query.uid； post方式：req.body.uid
  if (uid) {
    // 为了避免sql注入攻击,在sql查询使用前,我们需要转义用户提供的任何数据connection.escape()
    sql += ' where uid=' + connection.escape(uid)
  }
  // res.status(200) // 设置HTTP状态码
  connection.query(sql, (err, data) => {
    if(err) throw err
    let result = {
      code: 0,
      message: '查询成功'
    }
    result.data = data
    res.json(result) // 传送JSON响应
  })
  // connection.end()
})

// 添加-接口：addData 指定为post的http请求方法
app.post('/addData', function (req, res) {
  let uid = req.body.uid // get方式：req.query.uid； post方式：req.body.uid
  let name = req.body.name
  let uclass = req.body.class
  let params = [uid, name, uclass]
  // uid,name,class不能为空
  let sql = 'INSERT INTO user_tb(uid,name,class) VALUES(?,?,?)'
  if (uid && name && uclass) { // 添加成功
    connection.query(sql, params, (err, data) => {
    if(err) throw err
    let result = {
      code: 0,
      message: '添加成功'
    }
    res.json(result) // 传送JSON响应
    })
  } else { // 添加失败
    res.status(500) // 设置HTTP状态码
    let result = {
      code: -1,
      message: 'uid、name、class不能为空'
    }
    throw (res.json(result))
  }
})

// 删除-接口：deleteData 指定为post的http请求方法
app.post('/deleteData', function (req, res) {
  let uid = req.body.uid // get方式：req.query.uid； post方式：req.body.uid
  // uid不能为空
  let sql = 'DELETE FROM user_tb WHERE uid = ' + uid
  if (uid) { // 添加成功
    connection.query(sql, (err, data) => {
    if(err) throw err
    let result = {
      code: 0,
      message: '删除成功'
    }
    res.json(result) // 传送JSON响应
    })
  } else { // 删除失败
    res.status(500) // 设置HTTP状态码
    let result = {
      code: -1,
      message: 'uid不能为空'
    }
    throw (res.json(result))
  }
})

// 修改-接口：editData 指定为post的http请求方法
app.post('/editData', function (req, res) {
  let uid = req.body.uid // get方式：req.query.uid； post方式：req.body.uid
  let name = req.body.name
  let uclass = req.body.class
  let params = [name, uclass, uid]
  // uid,name,class不能为空
  let sql = 'UPDATE user_tb SET name = ?,class = ? WHERE uid = ?'
  if (uid && name && uclass) { // 修改成功
    connection.query(sql, params, (err, data) => {
      if(err) throw err
      let result = {
        code: 0,
        message: '修改成功'
      }
      res.json(result) // 传送JSON响应
    })
  } else { // 修改失败
    res.status(500) // 设置HTTP状态码
    let result = {
      code: -1,
      message: 'uid、name、class不能为空'
    }
    throw (res.json(result))
  }
})

//配置服务端口
let server = app.listen(3000, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
```

### 4).调接口页面，通过点击事件调取接口
```js
getInfo () {
  console.log('已点击')
  this.$http.get('http://localhost:3000/getData').then(function (data) {
    console.log(data.body)
  })
}
```

### 5).启动node服务
(进入api.js目录，node api.js 启动服务或者),既然是和vue脚手架一起构建，就充分利用起来。打开package.json , 在 scripts 中 添加一行:<br/>
`"server": "node src/server/api.js";`<br/>
`npm run server` 直接启动服务<br/>
新开一个窗口，执行：<br/>
`npm run dev`

### 6).执行getInfo()就可以调取接口，获取数据
F12查看将获取的数据，demo到此结束。
<br/>

<imageView imageTitle="总体效果" imageUrl="/images/dataList.png"/>
