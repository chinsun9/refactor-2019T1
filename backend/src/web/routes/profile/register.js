const fs = require('fs');
const express = require('express');
const router = express.Router();

const ejs = require('ejs');
const request = require('request');

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  if (typeof req.cookies.userNum == 'undefined') {
    console.log(new Date() + '] 쿠키없는 접근');

    res.render('chinsung_404.ejs', {
      msg: 'Session expiration',
    });
    return;
  }

  var results = client.query(
    'select * from USER where userNum = ' + req.cookies.userNum
  );
  // console.log(results[0]);

  var userName = '';

  results.forEach((item, index) => {
    userName = item.userName;
  });

  res.render('chinsung_registerEOG', {
    title: 'registerEOG',
    userName: userName,
  });
  // fs.readFile('web/web/chinsung_registerEOG.ejs', 'utf8', (err, data) => {
  // 	res.writeHead(200, {'Content-Type': 'text/html'});
  // 	res.write('<meta charset=utf8>');
  // 	res.end(ejs.render(data, {

  // 	}));
  // });
});

// router.get('/', (req, res) => {
// 	var results = client.query('select * from USER where userNum = ' + req.cookies.userNum);
// 	console.log(results[0]);

// 	fs.readFile('web/web/chinsung_registerEOG.ejs', 'utf8', (err, data) => {
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write('<meta charset=utf8>');
// 		res.end(ejs.render(data, {

// 		}));
// 	});
// });

router.post('/', (req, res) => {
  var token = req.body.token;

  console.log(token);

  fs.writeFile('data.txt', token + ' ' + req.cookies.userNum, 'utf8', (err) => {
    console.log(err);
    res.redirect('/web/main/index');
  });
});

module.exports = router;
