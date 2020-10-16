const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('chinsung_graph_wrapper.ejs', {
    title: 'Tool',
  });
});

module.exports = router;
