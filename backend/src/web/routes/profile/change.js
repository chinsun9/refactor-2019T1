const express = require('express');
const router = express.Router();
const client = require('../../utils/mysql');
const chk_session = require('../../utils/chk-session');

// 인풋 ; 세션 아이디

// 아웃풋 ; 수정완료 ; 기존비번, 새비번, 새비번2

router.use(chk_session);

router.get('/', (req, res) => {
  const results = client.query('select * from USER where userNum = ?', [
    req.session.userNum,
  ]);

  let userName = '';

  results.forEach((item, index) => {
    userName = item.userName;
  });

  res.render('chinsung_password_change', {
    userName: userName,
    title: 'password_change',
  });
});

router.post('/', (req, res) => {
  const { oldPw, newPw1, newPw2 } = req.body.oldPw;

  // 비밀번호 검사
  if (newPw1 !== newPw2) {
    throw new Error('non-match password');
  }

  const chkPw = client.query(
    'SELECT userPw FROM luciddb.USER where userNum = ?',
    [req.session.userNum]
  )[0].userPw;

  if (oldPw !== chkPw) {
    throw new Error('incorrect password');
  }

  client.query('UPDATE `luciddb`.`USER` SET `userPw` = ? WHERE `userNum` = ?', [
    newPw1,
    req.session.userNum,
  ]);

  res.redirect('/web/profile/index');
});

module.exports = router;
