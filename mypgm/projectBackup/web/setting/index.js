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

var serviceOrder = new Array();
var myString = ["lieTimeService", "getSleepTimeService", "wakeUpTimeService", "remSleepService", "stage12SleepService", "stage34SleepService", "totalSleepTimeService", "sleepEfficiencyService", "dailySleepTimeService"];
var myStringOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// 웹 편집 위해 빠른 로그인 없이 보이기
router.get('/', (req, res) => {
	let myResults = "";
	myResults = client.query("select * from SERVICEEOGORDER where userNum=" + req.cookies.userNum);

	myResults.forEach((item, index) => {
		myStringOrder[0] = item.lieTimeService;
		myStringOrder[1] = item.getSleepTimeService;
		myStringOrder[2] = item.wakeUpTimeService;
		myStringOrder[3] = item.remSleepService;
		myStringOrder[4] = item.stage12SleepService;
		myStringOrder[5] = item.stage34SleepService;
		myStringOrder[6] = item.totalSleepTimeService;
		myStringOrder[7] = item.sleepEffciencyService;
		myStringOrder[8] = item.dailySleepTimeService;
	});

	console.log(myStringOrder.toString());

	let tempName = "";
	myResults = client.query("select * from USER where userNum = " + req.cookies.userNum);
	myResults.forEach((item, index) => {
		tempName = item.userName;
	});

	res.render('chinsung_setting',{
			orderCard: myStringOrder,
			orderList: myString,
			title: 'setting',
			userName: tempName
	})

	// console.log("get"+hello);
	// if(hello.length==0){
	// 	console.log("으악")

	// 	hello=[0,1,2,3,4,5,6,7,8,9,10,11];
	// }
	// console.log("나는 get이야" + hello);

	// fs.readFile('web/web/chinsung_setting.ejs', 'utf8', (err, data) => {
	// 	res.writeHead(200, {'Content-Type': 'text/html'});
	// 	res.write('<meta charset=utf8>');
	// 	res.end(ejs.render(data, {
	// 		orderCard: hello
	// 	}));
	// });

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
	serviceOrder = req.body.arr;
	console.log(serviceOrder);
	let myResults = client.query("delete from SERVICEEOGORDER where userNum = " + req.cookies.userNum);
	myResults = client.query("insert into SERVICEEOGORDER values (" + req.cookies.userNum + ", " + serviceOrder[0] + ", " + serviceOrder[1] + ", " + serviceOrder[2] + ", " + serviceOrder[3] + ", " + serviceOrder[4] + ", " + serviceOrder[5] + ", " + serviceOrder[6] + ", "  + serviceOrder[7] + ", "  + serviceOrder[8] + ")");

	//디비에 배열 저장!




	res.redirect('/web/setting/index')
});

// router.post('/', (req, res) => {
// 	var userId = req.body.userId;
// 	var userPw = req.body.userPw;

// 	var user = "";

// 	var results = client.query('select userNum from luciddb.USER where userId = "' + userId + '" and userPw = "' + userPw + '"');

// 	results.forEach((item, index) => {
// 		user = item.userNum;
// 	});

// 	if(user != "") {
// 		res.redirect('/web/main/index');
// 	}
// 	else {
// 		res.redirect('/web/login');
// 	}
// });

module.exports = router;
