const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/web/login');
});

router.get('/test', (req, res) => {
  res.render('chinsung_test', {
    title: 'dd',
  });
});

module.exports = router;
