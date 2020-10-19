const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  // 이미 로그인한 경우
  if (req.session.userNum) {
    res.redirect('/web/main/index');
    return;
  }

  console.log(req.session.loginMessage);

  res.render('chinsung_login', {
    title: 'Login',
    loginMessage: req.session.loginMessage,
  });
});

router.post('/', (req, res) => {
  const { userId, userPw } = req.body;

  const query =
    'select userNum from luciddb.USER where userId = ? and userPw = ?';
  const queryArgs = [userId, userPw];
  const results = client.query(query, queryArgs);

  if (results.length !== 0) {
    req.session.userNum = results[0].userNum;
    req.session.loginMessage = '';

    res.redirect('/web/main/index');
  } else {
    req.session.loginMessage = 'Login Failed';
    res.redirect('/web/login');
  }
});

module.exports = router;
