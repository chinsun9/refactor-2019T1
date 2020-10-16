const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  res.render('chinsung_register');
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

  console.log(req.body);

  var user = '';

  //1. 빈값이 있는지 체크
  //2. id 중복확인

  var byeFlag = false;

  //1. 빈값 체크
  if (
    userId == null ||
    userPw == null ||
    userName == null ||
    userEmail == null ||
    userBirth == null
  ) {
    byeFlag = true;
  } else {
    //2. id 중복확인
    var results = client.query(
      'select count(*) from luciddb.USER where userId="' + userId + '"'
    );
    console.log(results.toString());
    if (result != 0) {
      byeFlag = true;
    } else {
      // 모두 통과하면 db에 저장하기

      var results2 = client.query('select count(*) from luciddb.USER');
      console.log(results2.toString());
      results2++;
    }
  }

  if (byeFlag) {
    res.redirect('/web/user/register');
  } else {
    res.redirect('/main');
  }
});

module.exports = router;
