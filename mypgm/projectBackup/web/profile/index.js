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


// 필요한 정보. 사용자 정보 + 뇌파 등록 여부

//웹 편집위해 로그인 없이
// router.get('/', (req, res) => {
// 	var userId = "id";
// 	var userPw = "pw";
// 	var userName = "username";
// 	var userEmail = "email";
// 	var userEmailStatus = 1;
// 	var userBirth = "961118";
// 	var userSex = 0;	//남자일때 0
// 	var userArea = 2;
//
// 	res.render('chinsung_profile_edit',{
//
// 		title: 'Profile_edit',
//
// 		userId: userId,
// 		userPw: userPw,
// 		userName: userName,
// 		userEmail: userEmail,
// 		userEmailStatus: userEmailStatus,
// 		userBirth: userBirth,
// 		userSex: userSex,
// 		userArea: userArea
// 	})
//
//
// 	fs.readFile('web/web/chinsung_profile_edit.ejs', 'utf8', (err, data) => {
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write('<meta charset=utf8>');
// 		res.end(ejs.render(data, {
// 		}));
// 	});
// });

router.get('/', (req, res) => {
	var results = client.query('select * from USER where userNum = ' + req.cookies.userNum);
	// console.log(results[0]);

	var userId = "";
	var userPw = "";
	var userName = "";
	var userEmail = "";
	var userEmailStatus = 0;
	var userBirth = "";
	var userSex = 0;
	var userArea = 0;

	results.forEach((item, index) => {
		userId = item.userId;
		userPw = item.userPw;
		userName = item.userName;
		userEmail = item.userEmail;
		userEmailStatus = item.userEmailStatus;
		userSex = item.userSex;
		userBirth = item.userBirth;
		userArea = item.userArea;
	});

	// fs.readFile('web/web/chinsung_profile_edit.ejs', 'utf8', (err, data) => {
	// 	res.writeHead(200, {'Content-Type': 'text/html'});
	// 	res.write('<meta charset=utf8>');
	// 	res.end(ejs.render(data, {
	// 		userId: userId,
	// 		userPw: userPw,
	// 		userName: userName,
	// 		userEmail: userEmail,
	// 		userEmailStatus: userEmailStatus,
	// 		userBirth: userBirth,
	// 		userSex: userSex,
	// 		userArea: userArea
	// 	}));
	// });
		res.render('chinsung_profile_edit',{

			title: 'Profile_edit',

			userId: userId,
			userPw: userPw,
			userName: userName,
			userEmail: userEmail,
			userEmailStatus: userEmailStatus,
			userBirth: userBirth,
			userSex: userSex,
			userArea: userArea
		})
});

// router.post('/', (req, res) => {
// 	var userName = req.body.userName;
// 	var userEmail = req.body.userEmail;
// 	var userEmailStatus = req.body.userEmailStatus;
// 	var userBirth = req.body.userBirth;
// 	var userSex = req.body.userSex;
// 	var userArea = req.body.userArea;
//
//
// 	console.log(userName)
// 	console.log(userEmail)
// 	console.log(userEmailStatus)
// 	console.log(userBirth)
// 	console.log(userSex)
// 	console.log(userArea)
//
// 	res.redirect('/web/login');
// });

router.post('/', (req, res) => {
	var userId = req.body.userId;
	var userPw = req.body.userPw;
	console.log(req.body);
	var user = "";

	var results = client.query('select userNum from luciddb.USER where userId = "' + userId + '" and userPw = "' + userPw + '"');

	results.forEach((item, index) => {
		user = item.userNum;
	});

	console.log('update USER set userName = "' + req.body.userName + '", userEmail = "' + req.body.userEmail + '", userEmailStatus = "' + req.body.userEmailStatus + '", userBirth = "' + req.body.userBirth + '", userSex = ' + req.body.userSex + ', userArea = ' + req.body.userArea + ' where userNum = ' + req.cookies.userNum);
	var results = client.query('UPDATE luciddb.USER SET userName = "' + req.body.userName + '", userEmail = "' + req.body.userEmail + '", userEmailStatus = "' + req.body.userEmailStatus + '", userBirth = "' + req.body.userBirth + '", userSex = ' + req.body.userSex + ', userArea = ' + req.body.userArea + ' where userNum = ' + req.cookies.userNum);

	res.redirect('/web/main/index');
	// if(user != "") {
	// 	res.cookie('userNum', user);
	// 	res.redirect('/web/main/index');
	// }
	// else {
	// 	res.redirect('/web/login');
	// }
});

module.exports = router;
