const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // 로그아웃, 쿠키 날리기
  res.clearCookie('userNum');

  // 로그인 페이지로
  res.redirect('/web/login');
});

module.exports = router;
