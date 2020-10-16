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


function date_to_str(format){
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    if(month<10) month = '0' + month;
    var date = format.getDate();
    if(date<10) date = '0' + date;

    return year + "-" + month + "-" + date;
}




router.get('/', (req, res) => {

	if(typeof  req.cookies.userNum == "undefined"){
		console.log(new Date() + "] 쿠키없는 접근")

		res.render('chinsung_404.ejs',
		{
			msg: "Session expiration"
		});
		return;
	}

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

	let sleepResult2 = client.query("select * from LOGINEOGFP1 where userNum = " + req.cookies.userNum);

	let ddata9 = 0;	//되냐

	sleepResult2.forEach((item, index) => {
		ddata9 = item.userNum;
	});


		var dateTest = new Date(userBirth)
		console.log("디비에서 가져온 원본 날짜 :" + dateTest)
		console.log("디비에서 가져온 원본 날짜+ :" + date_to_str(dateTest))

	userBirth = date_to_str(dateTest)

	console.log("웹에 보내지는 날짜 :" + userBirth)
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
			userBirth: userBirth.substr(0,10),		// input date에 맞는 형식으로 가공 필요.
			userSex: userSex,
			userArea: userArea,
			checkData: ddata9
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
