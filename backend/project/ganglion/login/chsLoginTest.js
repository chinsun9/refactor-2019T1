const express = require('express');
const router = express.Router();
const mysql = require('sync-mysql');


const client = new mysql({
	host: 'localhost',
	user: 'root',
	password: 'gachon654321',
	database: 'luciddb'
});

var checkLogin = false;
var userNum;
var userNum_fp2;
var checkLogin_fp2 = false;
//fp1 데이터
var temp = new Array();
//fp2 데이터
var temp_fp2 = new Array();

var validFp1;
var validFp2;
var chsMargin=0;
var chsMarginG2=0;

router.post('/', (req, res) => {
	chsMargin = req.body.chsMargin;
	chsMarginG2 = req.body.chsMarginG2;
	console.log("chs login tester" + chsMargin);
	// res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
	// res.end("a");
	// return;

	validFp1 = false;
	validFp2 = false;
	checkLogin = false;
	checkLogin_fp2 = false;

	var temp1 = login(req.body.TwoY);
	var teamp2 = login_fp2(req.body.ThreeY);
	// checkLogin =true;
	// console.log(" " + teamp2)
	console.log(temp1 + " " + teamp2)
	// checkLogin=true


	// 로그인 성공했을떄
	// if ( checkLogin_fp2 == true ) {
	if (checkLogin == true && checkLogin_fp2 == true && userNum == userNum_fp2) {
		// var query_user = "SELECT * FROM USER WHERE userNum = " + userNum;
		// var result_user = client.query(query_user);
		var login_user = new Object();
		// login_user.userNum = result_user[0].userNum;
		login_user.userId = userNum_fp2;
		// login_user.userName = result_user[0].userName;
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
		res.end(JSON.stringify(login_user));
		// console.log(JSON.stringify(login_user));
		return;
	}
	//로그인 실패
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
	res.end("a")
});

function login(fpdata) {
	let TwoY = null;
	TwoY = fpdata;

	var checkLoginOk = g1forCheck(TwoY);
	return checkLoginOk

}

function login_fp2(fpdata) {
	let ThreeY = null;
	ThreeY = fpdata;

	var checkLoginOk_fp2 = g1forCheck_fp2(ThreeY);
	return checkLoginOk_fp2

}

function g1forCheck(y) {
	let max = 100; let maxX = 0;
	let min = 100; let minX = 0;
	var a = "";
	var g3check;
	for (let i = 0; i < y.length; i++) {
		if (max > y[i]) {
			max = y[i];
			maxX = i;
		}
	}

	for (let i = 0; i < y.length; i++) {
		if (min < y[i]) {
			min = y[i];
			minX = i;
		}
	}

	let ip = maxX;
	let in1 = 0;

	let check = 0;
	for (let i = 0; i < y.length; i++) {
		if (i > maxX + 2 && y[i] >= 100) {
			in1 = minX - i;
			// console.log("aa");
			//in1 = j;
			check = 1;
			break;
		}
		if (check == 1)
			break;
	}

	in1 = minX - in1;
	g3check = getG3forCheck(y, max, min, ip, in1);
	//var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + max + " BETWEEN mpMin - 5 AND mpMax + 5 AND " + min + " BETWEEN mnMin - 5 AND mnMax + 5 AND "+ ip +" BETWEEN ipMin - 5 AND ipMax + 5 AND " + in1 + " BETWEEN inMin - 5 AND inMax + 5";
	//var result = client.query(query);
	//console.log(result.length);
	//console.log("dd" + max + min + ip + in1);
	if (g3check == 99) {
		return 99;
	}
	else {
		checkLogin = true;
		userNum = g3check[0].userNum;
		return g3check[0].userNum;
	}
}

function g1forCheck_fp2(y) {
	let max = 100; let maxX = 0;
	let min = 100; let minX = 0;
	var g3check;
	var a = "";
	for (let i = 0; i < y.length; i++) {
		if (max > y[i]) {
			max = y[i];
			maxX = i;
		}
	}

	for (let i = 0; i < y.length; i++) {
		if (min < y[i]) {
			min = y[i];
			minX = i;
		}
	}

	let ip = maxX;
	let in1 = 0;

	let check = 0;
	for (let i = 0; i < y.length; i++) {
		if (i > maxX + 2 && y[i] >= 100) {
			in1 = minX - i;
			// console.log("aa");
			//in1 = j;
			check = 1;
			break;
		}
		if (check == 1)
			break;
	}

	in1 = minX - in1;
	g3check = getG3forCheck_fp2(y, max, min, ip, in1);
	// var query_fp2 = "SELECT userNum FROM LOGINEOGFP2 WHERE " + max + " BETWEEN mpMin - 5 AND mpMax + 5 AND " + min + " BETWEEN mnMin - 5 AND mnMax + 5 AND "+ ip +" BETWEEN ipMin - 5 AND ipMax + 5 AND " + in1 + " BETWEEN inMin - 5 AND inMax + 5";
	// var result_fp2 = client.query(query_fp2);
	// console.log("dd" + max + min + ip + in1);
	if (g3check == 99) {
		//console.log(result_fp2.length);
		return 99;
	}
	else {
		checkLogin_fp2 = true;
		userNum_fp2 = g3check[0].userNum;
		return g3check[0].userNum;
	}
}

function getG3forCheck(y, mp, mn, ips, ins) {
	if (mp != 0 && mp != 1 && mn != 199 && mn != 200) {
		var temp_sop = mp / ips;
		var temp_son = mn / ins;
		var temp_index = 10000;
		var temp_index2 = 10000;
		var temp_dn;
		var temp_sfp;
		var temp_dp;
		var temp_sfn;
		var flag1 = false;
		var flag2 = false;
		var flag3 = false
		y.some((data, index) => {
			if (flag3 == true)
				return true
			if (data == mp && flag1 == false) {
				temp_index = index;
				flag1 = true;
			}
			else if (index > temp_index && data >= 100 && flag1 == true && flag2 == false) {
				temp_sfp = (index - temp_index) / mp;
				temp_dp = index;
				temp_dn = y.length - 1 - index;
				// console.log(temp_dn);
				flag2 = true;
			}
			else if (index > temp_index && data == mn && flag2 == true && flag3 == false) {
				temp_index2 = index;
				temp_sfn = (temp_dn - ins) / mn;
				flag3 = true;
			}
		});
		temp_sop = temp_sop.toFixed(2);
		temp_son = temp_son.toFixed(2);
		temp_sfp = temp_sfp.toFixed(2);
		temp_sfn = temp_sfn.toFixed(2);
		validFp1 = true;
		var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + mp + " BETWEEN mpMin-"+chsMargin+" AND mpMax+"+chsMargin+" AND " + mn + " BETWEEN mnMin-"+chsMargin+" AND mnMax+"+chsMargin+" AND " + ips + " BETWEEN ipMin-"+chsMargin+" AND ipMax+"+chsMargin+" AND " + ins + " BETWEEN inMin-"+chsMargin+" AND inMax+"+chsMargin+" AND " + temp_sop + " BETWEEN sopMin-"+chsMarginG2+" AND sopMax+"+chsMarginG2+" AND " + temp_son + " BETWEEN sonMin-"+chsMarginG2+" AND sonMax+"+chsMarginG2+" AND " + temp_sfp + " BETWEEN sfpMin-"+chsMarginG2+" AND sfpMax+"+chsMarginG2+" AND " + temp_sfn + " BETWEEN sfnMin-"+chsMarginG2+" AND sfnMax+"+chsMarginG2+" AND " + temp_dp + " BETWEEN dpMin-"+chsMarginG2+" AND dpMax+"+chsMarginG2+" AND " + temp_dn + " BETWEEN dnMin-"+chsMarginG2+" AND dnMax+"+chsMarginG2+"";
		//var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + mp + " BETWEEN mpMin-10 AND mpMax+10 AND " + mn + " BETWEEN mnMin-10 AND mnMax+10 AND "+ ips +" BETWEEN ipMin-10 AND ipMax+10 AND " + ins + " BETWEEN inMin-10 AND inMax+10";
		//var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + temp_sop +" BETWEEN sopMin-3 AND sopMax+3 AND "+ temp_son +" BETWEEN sonMin-3 AND sonMax+3 AND " + temp_sfp +" BETWEEN sfpMin-3 AND sfpMax+3 AND "+ temp_sfn +" BETWEEN sfnMin-3 AND sfnMax+3 AND "+ temp_dp +" BETWEEN dpMin-3 AND dpMax+3 AND "+ temp_dn +" BETWEEN dnMin-3 AND dnMax+3";

		// console.log(query);
		var result = client.query(query);
		if (result.length == 0) {
			return 99;
		}
		else {
			return result;
		}
	}
	else {
		return 99;
	}
}

function getG3forCheck_fp2(y, mp, mn, ips, ins) {
	if (mp != 0 && mp != 1 && mn != 199 && mn != 200) {
		var temp_sop = mp / ips;
		var temp_son = mn / ins;
		var temp_index = 10000;
		var temp_index2 = 10000;
		var temp_dn;
		var temp_sfp;
		var temp_dp;
		var temp_sfn;
		var flag1 = false;
		var flag2 = false;
		var flag3 = false
		y.some((data, index) => {
			if (flag3 == true)
				return true
			if (data == mp && flag1 == false) {
				temp_index = index;
				flag1 = true;
			}
			else if (index > temp_index && data >= 100 && flag1 == true && flag2 == false) {
				temp_sfp = (index - temp_index) / mp;
				temp_dp = index;
				temp_dn = y.length - 1 - index;
				// console.log(temp_dn);
				flag2 = true;
			}
			else if (index > temp_index && data == mn && flag2 == true && flag3 == false) {
				temp_index2 = index;
				temp_sfn = (temp_dn - ins) / mn;
				flag3 = true;
			}
		});
		temp_sop = temp_sop.toFixed(2);
		temp_son = temp_son.toFixed(2);
		temp_sfp = temp_sfp.toFixed(2);
		temp_sfn = temp_sfn.toFixed(2);
		validFp2 = true;
		var query = "SELECT userNum FROM LOGINEOGFP2 WHERE " + mp + " BETWEEN mpMin-"+chsMargin+" AND mpMax+"+chsMargin+" AND " + mn + " BETWEEN mnMin-"+chsMargin+" AND mnMax+"+chsMargin+" AND " + ips + " BETWEEN ipMin-"+chsMargin+" AND ipMax+"+chsMargin+" AND " + ins + " BETWEEN inMin-"+chsMargin+" AND inMax+"+chsMargin+" AND " + temp_sop + " BETWEEN sopMin-"+chsMarginG2+" AND sopMax+"+chsMarginG2+" AND " + temp_son + " BETWEEN sonMin-"+chsMarginG2+" AND sonMax+"+chsMarginG2+" AND " + temp_sfp + " BETWEEN sfpMin-"+chsMarginG2+" AND sfpMax+"+chsMarginG2+" AND " + temp_sfn + " BETWEEN sfnMin-"+chsMarginG2+" AND sfnMax+"+chsMarginG2+" AND " + temp_dp + " BETWEEN dpMin-"+chsMarginG2+" AND dpMax+"+chsMarginG2+" AND " + temp_dn + " BETWEEN dnMin-"+chsMarginG2+" AND dnMax+"+chsMarginG2+"";
		// console.log(query);
		var result = client.query(query);
		if (result.length == 0) {
			return 99;
		}
		else {
			return result;
		}
	}
	else {
		return 99;
	}
}

const isVaild = (x, TwoY, range) => {
	let tol = 1;
	for (let i = 0; i < range; i++) {
		if (temp[x - i] >= TwoY[range - i] - 2 && temp[x - i] <= TwoY[range - i] + 2) {
			;
		}
		else {
			return false;
		}
	}
	return true;
}

const isVaild_fp2 = (x, ThreeY, range) => {
	let tol = 1;
	for (let i = 0; i < range; i++) {
		if (temp_fp2[x - i] >= ThreeY[range - i] - 2 && temp_fp2[x - i] <= ThreeY[range - i] + 2) {
			;
		}
		else {
			return false;
		}
	}
	return true;
}

module.exports = router;
