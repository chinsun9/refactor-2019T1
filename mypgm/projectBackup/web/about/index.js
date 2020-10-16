const fs = require('fs');
const express = require('express');
const router = express.Router();
const mysql = require('sync-mysql');
const ejs = require('ejs');

var client = new mysql({
	host: 'localhost',
	user: 'root',
	password: 'gachon654321',
	database: 'luciddb'
});


// 웹 편집 위해 빠른 로그인 없이 보이기
router.get('/', (req, res) => {
	
	res.render('chinsung_about.ejs');


});

// router.get('/', (req, res) => {
// 	if(req.cookies.userNum == null) {
// 		res.redirect('/web/login');
// 	}
// 	else {

// 	fs.readFile('web/web/chinsung_main.ejs', 'utf8', (err, data) => {
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write('<meta charset=utf8>');
// 		res.end(ejs.render(data, {

// 		}));
// 	});

// 	}
// });

router.post('/', (req, res) => {
	var userId = req.body.userId;
	var userPw = req.body.userPw;

	var user = "";

	var results = client.query('select userNum from luciddb.USER where userId = "' + userId + '" and userPw = "' + userPw + '"');

	results.forEach((item, index) => {
		user = item.userNum;
	});

	if(user != "") {
		res.redirect('/web/main/index');
	}
	else {
		res.redirect('/web/login');
	}
});

module.exports = router;
