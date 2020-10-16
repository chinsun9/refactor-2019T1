const express = require('express');
const router = express.Router();
const client = require('../../utils/mysql');

router.get('/', (req, res) => {
  res.render('chinsung_about.ejs');
});

router.post('/', (req, res) => {
  var userId = req.body.userId;
  var userPw = req.body.userPw;

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

  if (user != '') {
    res.redirect('/web/main/index');
  } else {
    res.redirect('/web/login');
  }
});

module.exports = router;
