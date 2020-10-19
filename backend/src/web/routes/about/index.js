const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('chinsung_about.ejs');
});

module.exports = router;
