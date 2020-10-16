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

router.get('/', (req, res) => {


	fs.readFile('web/web/chinsung_login.ejs', 'utf8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<meta charset=utf8>');
		res.end(ejs.render(data, {
			title: "Login"
		}));
	});
});

router.post('/', (req, res) => {
	var userId = req.body.userId;
	var userPw = req.body.userPw;

	var user = "";

	// 리퀘스트에서 아이피 가져오기
	//var userIP = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
	//console.log(userIP)

	var results = client.query('select userNum from luciddb.USER where userId = "' + userId + '" and userPw = "' + userPw + '"');

	results.forEach((item, index) => {
		user = item.userNum;
	});

	if(user != "") {
		res.cookie('userNum', user);
		res.redirect('/web/main/index');
	}
	else {
		res.redirect('/web/login');
	}
});

module.exports = router;
