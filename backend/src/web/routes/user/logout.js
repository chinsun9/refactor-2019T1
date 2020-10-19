const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.userNum = '';

  res.redirect('/web/login');
});

module.exports = router;
