const express = require('express');
const router = express.Router();
const client = require('../../utils/mysql');
const chk_session = require('../../utils/chk-session');

function date_to_str(format) {
  const year = format.getFullYear();
  let month = format.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let date = format.getDate();
  if (date < 10) date = '0' + date;

  return year + '-' + month + '-' + date;
}

router.use(chk_session);

router.get('/', (req, res) => {
  const results = client.query(
    'select * from USER where userNum = ' + req.session.userNum
  );
  // console.log(results[0]);

  let userId = '';
  let userPw = '';
  let userName = '';
  let userEmail = '';
  let userEmailStatus = 0;
  let userBirth = '';
  let userSex = 0;
  let userArea = 0;

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

  let dateTest = new Date(userBirth);
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

  client.query(
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
