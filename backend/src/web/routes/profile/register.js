const fs = require('fs');
const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');
const chk_session = require('../../utils/chk-session');

router.use(chk_session);

router.get('/', (req, res) => {
  const results = client.query('select * from USER where userNum = ?', [
    req.session.userNum,
  ]);

  let userName = '';

  results.forEach((item, index) => {
    userName = item.userName;
  });

  res.render('chinsung_registerEOG', {
    title: 'registerEOG',
    userName: userName,
  });
});

router.post('/', (req, res) => {
  const token = req.body.token;

  console.log(token);

  fs.writeFile('data.txt', token + ' ' + req.session.userNum, 'utf8', (err) => {
    console.log(err);
    res.redirect('/web/main/index');
  });
});

module.exports = router;
