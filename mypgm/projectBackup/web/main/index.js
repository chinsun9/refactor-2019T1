const fs = require('fs');
const express = require('express');
const router = express.Router();
const mysql = require('sync-mysql');
const ejs = require('ejs');


var client = new mysql({
	host: 'localhost',
	user: 'root',
	// password: '1',
	password: 'gachon654321',
	database: 'luciddb'
});

//필요한 값
//사용자명
//사용자 카드 순서
//각 카드 데이터 인덱스, 통계명, 라벨, 데이터
var userName = "";
var serviceOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var myStringOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0];


var dataArr = []

function sleepService(req){
	dataArr = []

	let serviceTime = [];
	let lieTime = [];
	let getSleepTime = [];
	let wakeUpTime = [];
	let remStageTime = [];
	let stage12Time = [];
	let stage34Time = [];

	let sleepResult = client.query("select * from SERVICEEOG where userNum = " + req.cookies.userNum);
	//let sleepResult = client.query("select * from SERVICEEOG where userNum = " + 1);

	sleepResult.forEach((item, index) => {
		serviceTime[index] = item.serviceTime;
		lieTime[index] = item.lieTime;
		getSleepTime[index] = item.getSleepTime;
		wakeUpTime[index] = item.wakeUpTime;
		remStageTime[index] = item.remStageTime;
		stage12Time[index] = item.stage12Time;
		stage34Time[index] = item.stage34Time;
	});

	// var date = new Date();
	// console.log(date);
	// date = new Date(date.toString());
	// console.log(date);
	//console.log((date.getTime() - date1.getTime()) / 100);
	//console.log(date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());;

	//let test = client.query("insert into temp values('" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "')");



	console.log(serviceTime);
	console.log(lieTime);
	console.log(getSleepTime);
	console.log(wakeUpTime);
	console.log(remStageTime);
	console.log(stage12Time);
	console.log(stage34Time);

	// serviceTime.forEach((item, index) => {
	// 	serviceTime[index] = item.split('T');
	// 	console.log(serviceTime[index][0]);
	// });
	//
	// lieTime.forEach((item, index) => {
	// 	lieTime[index] = item.split('.');
	//
	// 	console.log(lieTime[index][0]);
	// });

	let dlabel = [];
	let ddata0 = [];	//누운 시간
	let ddata1 = [];	//잠들때까지 걸린 시간
	let ddata2 = [];	//기상 시간
	let ddata3 = [];	//REM 수면 시간
	let ddata4 = [];	//수면1,2 단계 시간
	let ddata5 = [];	//수면3,4 단계 시간
	let ddata6 = [];	//총 수면 수간
	let ddata7 = [];	//수면 효율
	let ddata8 = [];	//일일 수면 시간

	serviceTime.forEach((item, index) => {
		item = new Date(item);
		dlabel[index] = item.getFullYear() + "-" + item.getMonth() + "-" + item.getDate();
	});

	lieTime.forEach((item, index) => {
		ddata0[index] = parseFloat((new Date(item)).getHours() + "." + (new Date(item)).getMinutes());
	});

	getSleepTime.forEach((item, index) => {
		ddata1[index] = ((new Date(getSleepTime[index]).getTime()) - (new Date(lieTime[index]).getTime())) / 1000;
	});

	wakeUpTime.forEach((item, index) => {
		ddata2[index] = parseFloat((new Date(item)).getHours() + "." + (new Date(item)).getMinutes());
	});

	remStageTime.forEach((item, index) => {
		ddata3[index] = item;
	});

	stage12Time.forEach((item, index) => {
		ddata4[index] = item;
	});

	stage34Time.forEach((item, index) => {
		ddata5[index] = item;
	});

	wakeUpTime.forEach((item, index) => {
		ddata8[index] = ((new Date(wakeUpTime[index])).getTime() - (new Date(getSleepTime[index])).getTime()) / 1000;
	});

	wakeUpTime.forEach((item, index) => {
		if(index == 0) {
			ddata6[index] = ddata8[index];
		}
		else {
			ddata6[index] = ddata6[index-1] + ddata8[index];
		}
	});

	wakeUpTime.forEach((item, index) => {
		ddata7[index] = ((ddata5[index]) / (ddata4[index] + ddata5[index])) * 100;
	});

	console.log(ddata7);

	var dataObject = {
		dindex: 0,
		dname: '누운시간',
		dlabel: dlabel,
		ddata: ddata0
	}

	// 배열에 넣기
	dataArr.push(dataObject);

	dataObject = {
		dindex: 1,
		dname: '수면까지 걸린 시간',
		dlabel: dlabel,
		ddata: ddata1
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 2,
		dname: '기상 시간',
		dlabel: dlabel,
		ddata: ddata2
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 3,
		dname: 'REM 수면 단계 시간',
		dlabel: dlabel,
		ddata: ddata3
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 4,
		dname: 'Stage1,2 수면 단계 시간',
		dlabel: dlabel,
		ddata: ddata4
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 5,
		dname: 'Stage3,4 수면 단계 시간',
		dlabel: dlabel,
		ddata: ddata5
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 6,
		dname: '총 수면 시간',
		dlabel: dlabel,
		ddata: ddata6
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 7,
		dname: '수면 효율',
		dlabel: dlabel,
		ddata: ddata7
	}

	dataArr.push(dataObject);

	dataObject = {
		dindex: 8,
		dname: '일일 수면 시간',
		dlabel: dlabel,
		ddata: ddata8
	}

	dataArr.push(dataObject);
}

//메인에서 필요한 정보
// 카드 순서 정보, 알림, 사용자 정보

// 웹 편집 위해 빠른 로그인 없이 보이기
router.get('/', (req, res) => {

	let myResults = client.query("select * from USER where userNum = " + req.cookies.userNum);
	myResults.forEach((item, index) => {
		userName = item.userName;
	});

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

	console.log(myStringOrder);

	res.render('chinsung_main.ejs',
		{
			title: 'Main',
			orderCard: myStringOrder,
			userName: userName,
			dataArr: JSON.stringify(dataArr)
		}

	);

	sleepService(req);
});


router.post('/', (req, res) => {
	var userId = req.body.userId;
	var userPw = req.body.userPw;

	var user = "";

	var results = client.query('select userNum from luciddb.USER where userId = "' + userId + '" and userPw = "' + userPw + '"');

	results.forEach((item, index) => {
		user = item.userNum;
	});

	if (user != "") {
		res.redirect('/web/main/index');
	}
	else {
		res.redirect('/web/login');
	}
});

module.exports = router;
