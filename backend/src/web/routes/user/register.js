const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  res.render('chinsung_register', {
    title: 'Register',
  });
});

router.post('/', (req, res) => {
  const {
    userId,
    userPw,
    userName,
    userEmail,
    userEmailStatus,
    userBirth,
    userSex,
    userArea,
  } = req.body;

  let userNum;

  // id 중복검사

  const chkID = client.query('SELECT * FROM luciddb.USER where userId=?', [
    userId,
  ]);

  if (chkID.length !== 0) {
    throw new Error('Duplicate ID');
  }

  const results1 = client.query(
    'SELECT MAX(userNum) as lastNum FROM luciddb.USER'
  );

  if (results1.length === 0) {
    userNum = 1;
  } else {
    userNum = results1[0].lastNum + 1;
  }

  console.log(userNum + '');

  client.query('insert into luciddb.USER values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    userNum,
    userId,
    userPw,
    userName,
    userEmail,
    userEmailStatus,
    userBirth,
    userSex,
    userArea,
  ]);

  client.query(
    'insert into luciddb.SERVICEEOGORDER values (?, 0, 1, 2, 3, 4, 5, 6, 7, 8)',
    [userNum]
  );

  req.session.loginMessage = 'Sign-up successful! Please Sign-in.';

  res.redirect('/web/login');
});

module.exports = router;
