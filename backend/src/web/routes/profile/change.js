const fs = require("fs");
const express = require("express");
const router = express.Router();
const mysql = require("sync-mysql");
const ejs = require("ejs");
const request = require("request");

var client = new mysql({
  host: "localhost",
  user: "root",
  password: "gachon654321",
  database: "luciddb",
});

// 인풋 ; 세션 아이디

// 아웃풋 ; 수정완료 ; 기존비번, 새비번, 새비번2

router.get("/", (req, res) => {
  if (typeof req.cookies.userNum == "undefined") {
    console.log(new Date() + "] 쿠키없는 접근");

    res.render("chinsung_404.ejs", {
      msg: "Session expiration",
    });
    return;
  }

  var results = client.query(
    "select * from USER where userNum = " + req.cookies.userNum
  );
  // console.log(results[0]);

  var userName = "";

  results.forEach((item, index) => {
    userName = item.userName;
  });

  res.render("chinsung_password_change", {
    userName: userName,
    title: "password_change",
  });
});

// router.get('/', (req, res) => {
// 	var results = client.query('select * from USER where userNum = ' + req.cookies.userNum);
// 	console.log(results[0]);

// 	fs.readFile('web/web/chinsung_registerEOG.ejs', 'utf8', (err, data) => {
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write('<meta charset=utf8>');
// 		res.end(ejs.render(data, {

// 		}));
// 	});
// });

router.post("/", (req, res) => {
  var token = req.body.oldPw;
  var token1 = req.body.newPw1;
  var token2 = req.body.newPw2;

  console.log(token);
  console.log(token1);
  console.log(token2);

  fs.writeFile("data.txt", token + " " + req.cookies.userNum, "utf8", (err) => {
    console.log(err);
    res.redirect("/web/main/index");
  });
});

module.exports = router;
