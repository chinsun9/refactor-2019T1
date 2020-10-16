const fs = require('fs');
const express = require('express');
const router = express.Router();

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

  var userName = '';

  results.forEach((item, index) => {
    userName = item.userName;
  });

  res.render('chinsung_registerEOG', {
    title: 'registerEOG',
    userName: userName,
  });
});

router.post('/', (req, res) => {
  var token = req.body.token;

  console.log(token);

  fs.writeFile('data.txt', token + ' ' + req.cookies.userNum, 'utf8', (err) => {
    console.log(err);
    res.redirect('/web/main/index');
  });
});

module.exports = router;
