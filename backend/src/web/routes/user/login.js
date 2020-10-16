const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  res.render('chinsung_login', {
    title: 'Login',
  });
});

router.post('/', (req, res) => {
  var userId = req.body.userId;
  var userPw = req.body.userPw;

  var user = '';

  // 리퀘스트에서 아이피 가져오기
  //var userIP = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  //console.log(userIP)

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

  if (user != '') {
    res.cookie('userNum', user);
    res.redirect('/web/main/index');
  } else {
    res.redirect('/web/login');
  }
});

module.exports = router;
