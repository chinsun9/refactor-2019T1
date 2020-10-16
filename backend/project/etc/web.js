const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const js = require ('./web2/js.js');
const css = require('./web2/css.js');
const vendor = require('./web2/vendor.js');
const express = require('express');

const app = express();

app.use('/web/main/js', js);
app.use('/web/main/vendor', vendor);
app.use('/web/main/css', css);

// 메인화면
app.use('/web/main/index', (req, res) => {
  fs.readFile('./web2/chinsung_main.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {}));
    if(err){
      console.log(err);
    }
  })
})


app.use('/web/user/js', js);
app.use('/web/user/vendor', vendor);
app.use('/web/user/css', css);
// 로그인 화면
app.use('/web/user/login', (req, res) => {
  fs.readFile('./web2/chinsung_login.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {}));
    if(err){
      console.log(err);
    }
  })
})


app.use('/web/user/js', js);
app.use('/web/user/vendor', vendor);
app.use('/web/user/css', css);
app.use('/web/js', js);
app.use('/web/vendor', vendor);
app.use('/web/css', css);
// 로그인 화면
app.use('/web/login', (req, res) => {
  fs.readFile('./web2/chinsung_login.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {}));
    if(err){
      console.log(err);
    }
  })
})
// 회원가입 화면
app.use('/web/user/register', (req, res) => {
  fs.readFile('./web2/chinsung_register.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {}));
    if(err){
      console.log(err);
    }
  })
})

app.use('/web/profile/js', js);
app.use('/web/profile/vendor', vendor);
app.use('/web/profile/css', css);
// 프로필 변경
app.use('/web/profile/index', (req, res) => {
  fs.readFile('./web2/chinsung_profile_edit.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {}));
    if(err){
      console.log(err);
    }
  })
})

// 뇌파등록
app.use('/web/profile/index', (req, res) => {
  fs.readFile('./web2/chinsung_registerEOG.ejs', 'utf8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {}));
    if(err){
      console.log(err);
    }
  })
})









app.listen('65001');
