const express = require('express');
const router = express.Router();
const client = require('../../utils/mysql');

function date_to_str(format) {
  var year = format.getFullYear();
  var month = format.getMonth() + 1;
  if (month < 10) month = '0' + month;
  var date = format.getDate();
  if (date < 10) date = '0' + date;

  return year + '-' + month + '-' + date;
}

router.get('/', (req, res) => {
  if (typeof req.session.userNum == 'undefined') {
    console.log(new Date() + '] 쿠키없는 접근');

    res.render('chinsung_404.ejs', {
      msg: 'Session expiration',
    });
    return;
  }

  var results = client.query(
    'select * from USER where userNum = ' + req.session.userNum
  );
  // console.log(results[0]);

  var userId = '';
  var userPw = '';
  var userName = '';
  var userEmail = '';
  var userEmailStatus = 0;
  var userBirth = '';
  var userSex = 0;
  var userArea = 0;

  results.forEach((item, index) => {
    userId = item.userId;
    userPw = item.userPw;
    userName = item.userName;
    userEmail = item.userEmail;
    userEmailStatus = item.userEmailStatus;
    userSex = item.userSex;
    userBirth = item.userBirth;
    userArea = item.userArea;
  });

  let sleepResult2 = client.query(
    'select * from LOGINEOGFP1 where userNum = ' + req.session.userNum
  );

  let ddata9 = 0; //되냐

  sleepResult2.forEach((item, index) => {
    ddata9 = item.userNum;
  });

  var dateTest = new Date(userBirth);
  console.log('디비에서 가져온 원본 날짜 :' + dateTest);
  console.log('디비에서 가져온 원본 날짜+ :' + date_to_str(dateTest));

  userBirth = date_to_str(dateTest);

  console.log('웹에 보내지는 날짜 :' + userBirth);

  res.render('chinsung_profile_edit', {
    title: 'Profile_edit',

    userId: userId,
    userPw: userPw,
    userName: userName,
    userEmail: userEmail,
    userEmailStatus: userEmailStatus,
    userBirth: userBirth.substr(0, 10), // input date에 맞는 형식으로 가공 필요.
    userSex: userSex,
    userArea: userArea,
    checkData: ddata9,
  });
});

router.post('/', (req, res) => {
  var userId = req.body.userId;
  var userPw = req.body.userPw;
  console.log(req.body);
  var user = '';

  var results = client.query(
    'select userNum from luciddb.USER where userId = "' +
      userId +
      '" and userPw = "' +
      userPw +
      '"'
  );

  results.forEach((item, index) => {
    user = item.userNum;
  });

  console.log(
    'update USER set userName = "' +
      req.body.userName +
      '", userEmail = "' +
      req.body.userEmail +
      '", userEmailStatus = "' +
      req.body.userEmailStatus +
      '", userBirth = "' +
      req.body.userBirth +
      '", userSex = ' +
      req.body.userSex +
      ', userArea = ' +
      req.body.userArea +
      ' where userNum = ' +
      req.session.userNum
  );
  var results = client.query(
    'UPDATE luciddb.USER SET userName = "' +
      req.body.userName +
      '", userEmail = "' +
      req.body.userEmail +
      '", userEmailStatus = "' +
      req.body.userEmailStatus +
      '", userBirth = "' +
      req.body.userBirth +
      '", userSex = ' +
      req.body.userSex +
      ', userArea = ' +
      req.body.userArea +
      ' where userNum = ' +
      req.session.userNum
  );

  res.redirect('/web/main/index');
});

module.exports = router;
