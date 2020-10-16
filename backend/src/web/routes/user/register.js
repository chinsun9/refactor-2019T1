const fs = require('fs');
const express = require('express');
const router = express.Router();
const mysql = require('sync-mysql');
const ejs = require('ejs');

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  res.render('chinsung_register', {
    title: 'Register',
  });
  // fs.readFile('web/web/chinsung_register.ejs', 'utf8', (err, data) => {
  // 	res.writeHead(200, {'Content-Type': 'text/html'});
  // 	res.write('<meta charset=utf8>');
  // 	res.end(ejs.render(data, {

  // 	}));
  // });
});

router.post('/', (req, res) => {
  var userId = req.body.userId;
  var userPw = req.body.userPw;
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userEmailStatus = req.body.userEmailStatus;
  var userBirth = req.body.userBirth;
  var userSex = req.body.userSex;
  var userArea = req.body.userArea;

  var count = 0;

  console.log(req.body);

  var results1 = client.query('select count(*) as count from luciddb.USER');

  results1.forEach((item, index) => {
    count = item.count;
  });

  console.log(count + '');

  var results2 = client.query(
    'insert into luciddb.USER values (' +
      (count + 1) +
      ', "' +
      userId +
      '", "' +
      userPw +
      '", "' +
      userName +
      '", "' +
      userEmail +
      '", ' +
      userEmailStatus +
      ', "' +
      userBirth +
      '", ' +
      userSex +
      ', ' +
      userArea +
      ')'
  );
  var results3 = client.query(
    'insert into luciddb.SERVICEEOGORDER values (' +
      (count + 1) +
      ', 0, 1, 2, 3, 4, 5, 6, 7, 8)'
  );
  res.redirect('/web/login');
});

module.exports = router;
