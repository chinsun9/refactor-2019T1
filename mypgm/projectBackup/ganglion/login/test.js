const express = require('express');
const router = express.Router();
const mysql = require('sync-mysql');

const client = new mysql({
        host: 'localhost',
        user: 'root',
        password: 'gachon654321',
        database: 'luciddb'
});

router.get('/', (req, res)=>{
  var login_user = new Object();
  var query_user = "SELECT * FROM USER WHERE userNum = 1";
  var result_user = client.query(query_user);
  login_user.userNum = result_user[0].userNum;
  login_user.userId = result_user[0].userId;
  login_user.userName = result_user[0].userName;
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  res.end(JSON.stringify(login_user));
});

module.exports = router;
