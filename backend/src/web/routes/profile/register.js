const fs = require('fs');
const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  if (typeof req.session.userNum == 'undefined') {
    throw new Error('no session');
  }

  var results = client.query(
    'select * from USER where userNum = ' + req.session.userNum
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

  fs.writeFile('data.txt', token + ' ' + req.session.userNum, 'utf8', (err) => {
    console.log(err);
    res.redirect('/web/main/index');
  });
});

module.exports = router;
