const fs = require("fs");
const express = require("express");
const router = express.Router();
const mysql = require("sync-mysql");
const ejs = require("ejs");

var client = new mysql({
  host: "localhost",
  user: "root",
  password: "gachon654321",
  database: "luciddb",
});

router.get("/", (req, res) => {
  res.render("chinsung_register");

  // fs.readFile('web/web/chinsung_register.ejs', 'utf8', (err, data) => {
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.write('<meta charset=utf8>');
  //     res.end(ejs.render(data, {

  //     }));
  // });
});

router.post("/", (req, res) => {
  var userId = req.body.userId;
  var userPw = req.body.userPw;
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userEmailStatus = req.body.userEmailStatus;
  var userBirth = req.body.userBirth;
  var userSex = req.body.userSex;
  var userArea = req.body.userArea;

  console.log(req.body);

  var user = "";

  //1. 빈값이 있는지 체크
  //2. id 중복확인

  var byeFlag = false;

  //1. 빈값 체크
  if (
    userId == null ||
    userPw == null ||
    userName == null ||
    userEmail == null ||
    userBirth == null
  ) {
    byeFlag = true;
  } else {
    //2. id 중복확인
    var results = client.query(
      'select count(*) from luciddb.USER where userId="' + userId + '"'
    );
    console.log(results.toString());
    if (result != 0) {
      byeFlag = true;
    } else {
      // 모두 통과하면 db에 저장하기

      var results2 = client.query("select count(*) from luciddb.USER");
      console.log(results2.toString());
      results2++;

      // var results3 = client.query('insert into luciddb.USER VALUES (' + results + ', "' + userId + '", "' + userPw + '", "' + userName + '", "' + userEmail + '", "' + userEmailStatus + '", ' + userBirth + ', ' + userSex + ', ' + userArea+ ')');
      // console.log(results3.toString());
    }
  }

  if (byeFlag) {
    res.redirect("/web/user/register");
  } else {
    res.redirect("/main");
  }
});

module.exports = router;
