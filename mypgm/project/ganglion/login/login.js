const express = require('express');
const router = express.Router();
const gpio = require('node-wiring-pi');
const mysql = require('sync-mysql');

const BLUE = 29;
const RED = 28;
const GREEN = 27;

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

const TurnOffRed = () => {
  gpio.digitalWrite(BLUE, 0);
  gpio.digitalWrite(RED, 0);
  gpio.digitalWrite(GREEN, 0);
}

const TurnOffLed = () => {
  gpio.digitalWrite(BLUE, 0);
  gpio.digitalWrite(RED, 0);
  gpio.digitalWrite(GREEN, 0);

  setTimeout(TurnOnLed, 300);
}

const TurnOnLed = () => {
  gpio.digitalWrite(BLUE, 1);
  gpio.digitalWrite(RED, 1);
  gpio.digitalWrite(GREEN, 1);

  setTimeout(TurnOff, 300);
}

const TurnOff = () => {
  gpio.digitalWrite(BLUE, 0);
  gpio.digitalWrite(RED, 0);
  gpio.digitalWrite(GREEN, 0);
}

router.post('/', (req, res) => {
  validFp1 = false;
  validFp2 = false;
  var fp1 = login(req.body.TwoY);
  var fp2 = login_fp2(req.body.ThreeY);
  if(validFp1 == true && validFp2 == true){
    gpio.digitalWrite(RED, 1);
    setTimeout(TurnOffRed, 1000);
  }
  if(checkLogin == false || checkLogin_fp2 == false){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.end("데이터 재 전송 요청..");
  }
  else if(checkLogin == true && checkLogin_fp2 == true && userNum == userNum_fp2){

    gpio.digitalWrite(BLUE, 1);
    gpio.digitalWrite(RED, 1);
    gpio.digitalWrite(GREEN, 1);
    setTimeout(TurnOffLed, 500);

    var query_user = "SELECT * FROM USER WHERE userNum = " + userNum;
    var result_user = client.query(query_user);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    var login_user = new Object();
    login_user.userNum = result_user[0].userNum;
    login_user.userId = result_user[0].userId;
    login_user.userName = result_user[0].userName;
    res.end(JSON.stringify(login_user));
    console.log(JSON.stringify(login_user));
    checkLogin = false;
    checkLogin_fp2 = false;
  }
  else{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.end("5");
  }
});

function login(fpdata) {
  let TwoY = null;
  TwoY = fpdata;
  console.log("TwoY 배열크기" + TwoY.length);

  // 처음 배열을 받는다면 temp로 덮어쓰고 종료
  if (temp.length == 0) {
      // 깊은 복사

      temp = JSON.parse(JSON.stringify(TwoY));
      console.log('first input!');
      return 0
      // 코드종료
  }
  else{
  var range = 700;
  var chkNum = 5;
  let check1 = 0;

  for (let i = temp.length - 1; i >= temp.length - range; i--) {

    // console.log(i+"안녕"+temp.length);
      if (isVaild(i, TwoY, chkNum)) {
          check1 = 1;
          console.log('배열 합치기 성공');
          temp.splice(i - chkNum, range);
          var result = temp.concat(TwoY);
          temp= [];
          break;
      }
      // console.log("성재바보");
    }
    if (check1 == 0) {
        console.log("실패")
        temp =  [];
        return 0

    }
    else{

        var checkPoint1 = 0;
        var checkPoint2 = 0;
        var checkPoint3 = 0;
        var check = 0;
        var flag1 = 0;
        //console.log(TwoY);
        // console.log(typeof (TwoY));

        for (let i = 0; i < result.length; i++) {
            if (result[i] <= 70 && flag1 == 0) {
                for (let j = i; result[j] <= 100; j--) {
                    if (result[j] >= 100) {
                        checkPoint1 = j;
                        flag1 = 1;
                        console.log('z');
                        break;
                    }
                }
            }
            // console.log("2");
            if (flag1 == 1 && result[i] >= 100) {
                console.log('qq');
                flag1 = 2;
                checkPoint2 = i;
            }
            if (flag1 == 2 && result[i] <= 100 && checkPoint2 + 10 < i) {
                checkPoint3 = i;
                break;
            }
        }
        console.log(checkPoint1 + "   " + checkPoint2 + "   " + checkPoint3);

        if(checkPoint1 != 0 && checkPoint2 != 0 && checkPoint3 != 0){
          var checkLoginOk = g1forCheck(result.slice( checkPoint1, checkPoint3 ));
          return checkLoginOk
        }

      temp = JSON.parse(JSON.stringify(TwoY));

      //console.log("첫쨰배열크기" + temp.length);
      //console.log("합쳐진 크기" + result.length);
      return 0
      }
    }
  }

function login_fp2(fpdata) {
  let ThreeY = null;
  ThreeY = fpdata;
  console.log("ThreeY 배열크기" + ThreeY.length);

  // 처음 배열을 받는다면 temp_fp2로 덮어쓰고 종료
  if (temp_fp2.length == 0) {
      // 깊은 복사

      temp_fp2 = JSON.parse(JSON.stringify(ThreeY));
      console.log('first input!');
      return 0
      // 코드종료
  }
  else {

  var range = 700;
  var chkNum = 5;
  let check1 = 0;

  for (let i = temp_fp2.length - 1; i >= temp_fp2.length - range; i--) {

    // console.log(i+"안녕"+temp_fp2.length);
      if (isVaild_fp2(i, ThreeY, chkNum)) {
          check1 = 1;
          console.log('배열 합치기 성공');
          temp_fp2.splice(i - chkNum, range);
          var result = temp_fp2.concat(ThreeY);
          temp_fp2= [];
          break;
      }
      // console.log("성재바보");
  }
    if (check1 == 0) {
        console.log("실패")
        temp_fp2 =  [];
        return 0

    }
    else{
      // console.log("1");

      var checkPoint1 = 0;
      var checkPoint2 = 0;
      var checkPoint3 = 0;
      var check = 0;
      var flag1 = 0;
      //console.log(ThreeY);
      // console.log(typeof (ThreeY));

      for (let i = 0; i < result.length; i++) {
          if (result[i] <= 70 && flag1 == 0) {
              for (let j = i; result[j] <= 100; j--) {
                  if (result[j] >= 100) {
                      checkPoint1 = j;
                      flag1 = 1;
                      console.log('z');
                      break;
                  }
              }
          }
          // console.log("2");
          if (flag1 == 1 && result[i] >= 100) {
              console.log('qq');
              flag1 = 2;
              checkPoint2 = i;
          }
          if (flag1 == 2 && result[i] <= 100 && checkPoint2 + 10 < i) {
              checkPoint3 = i;
              break;
          }
      }
      console.log(checkPoint1 + "   " + checkPoint2 + "   " + checkPoint3);

      if(checkPoint1 != 0 && checkPoint2 != 0 && checkPoint3 != 0){
            var checkLoginOk_fp2 = g1forCheck_fp2(result.slice( checkPoint1, checkPoint3 ));
            return checkLoginOk_fp2
      }
      // 추출끝나면 temp_fp2로 덮어쓰기
    temp_fp2 = JSON.parse(JSON.stringify(ThreeY));

    //console.log("첫쨰배열크기" + temp_fp2.length);
    //console.log("합쳐진 크기" + result.length);
    return 0
    }
  }
}

function g1forCheck (y) {
	let max = 100; let maxX = 0;
	let min = 100; let minX = 0;
	var a = "";
  var g3check;
	for(let i = 0; i < y.length; i++) {
		if(max > y[i]) {
			max = y[i];
			maxX = i;
		}
	}

	for(let i = 0; i < y.length; i++) {
		if(min < y[i]) {
			min = y[i];
			minX = i;
		}
	}

	let ip = maxX;
	let in1 = 0;

	let check = 0;
	for(let i = 0; i < y.length; i++) {
		if(i > maxX + 2 && y[i] >= 100) {
			in1 = minX - i;
			console.log("aa");
			//in1 = j;
			check = 1;
			break;
		}
		if(check == 1)
			break;
	}

	in1 = minX - in1;
  g3check = getG3forCheck(y, max, min, ip, in1);
  //var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + max + " BETWEEN mpMin - 5 AND mpMax + 5 AND " + min + " BETWEEN mnMin - 5 AND mnMax + 5 AND "+ ip +" BETWEEN ipMin - 5 AND ipMax + 5 AND " + in1 + " BETWEEN inMin - 5 AND inMax + 5";
  //var result = client.query(query);
  //console.log(result.length);
  //console.log("dd" + max + min + ip + in1);
  if(g3check == 5){
    return 5;
  }
  else {
    checkLogin = true;
    userNum = g3check[0].userNum;
    return g3check[0].userNum;
  }
}

function g1forCheck_fp2 (y) {
	let max = 100; let maxX = 0;
	let min = 100; let minX = 0;
  var g3check;
	var a = "";
	for(let i = 0; i < y.length; i++) {
		if(max > y[i]) {
			max = y[i];
			maxX = i;
		}
	}

	for(let i = 0; i < y.length; i++) {
		if(min < y[i]) {
			min = y[i];
			minX = i;
		}
	}

	let ip = maxX;
	let in1 = 0;

	let check = 0;
	for(let i = 0; i < y.length; i++) {
		if(i > maxX + 2 && y[i] >= 100) {
			in1 = minX - i;
			console.log("aa");
			//in1 = j;
			check = 1;
			break;
		}
		if(check == 1)
			break;
	}

	in1 = minX - in1;
  g3check = getG3forCheck_fp2(y, max, min, ip, in1);
  // var query_fp2 = "SELECT userNum FROM LOGINEOGFP2 WHERE " + max + " BETWEEN mpMin - 5 AND mpMax + 5 AND " + min + " BETWEEN mnMin - 5 AND mnMax + 5 AND "+ ip +" BETWEEN ipMin - 5 AND ipMax + 5 AND " + in1 + " BETWEEN inMin - 5 AND inMax + 5";
  // var result_fp2 = client.query(query_fp2);
  // console.log("dd" + max + min + ip + in1);
  if(g3check == 5){
    //console.log(result_fp2.length);
    return 5;
  }
  else {
    checkLogin_fp2 = true;
    userNum_fp2 = g3check[0].userNum;
    return g3check[0].userNum;
  }
}

function getG3forCheck (y, mp, mn, ips, ins) {
  if(mp != 0 && mp != 1 && mn != 199 && mn != 200){
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
      if(flag3 == true)
        return true
      if(data == mp && flag1 == false){
        temp_index = index;
        flag1 = true;
      }
      else if(index > temp_index && data >= 100 && flag1 == true && flag2 == false){
        temp_sfp = (index - temp_index) / mp;
        temp_dp = index;
        temp_dn = y.length -1 -index;
        console.log(temp_dn);
        flag2 = true;
      }
      else if (index > temp_index && data == mn && flag2 == true && flag3 == false){
        temp_index2 = index;
        temp_sfn = (temp_dn - ins)/mn;
        flag3 = true;
      }
    });
    temp_sop = temp_sop.toFixed(2);
    temp_son = temp_son.toFixed(2);
    temp_sfp = temp_sfp.toFixed(2);
    temp_sfn = temp_sfn.toFixed(2);
    validFp1 = true;
    var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + mp + " BETWEEN mpMin-5 AND mpMax+5 AND " + mn + " BETWEEN mnMin-5 AND mnMax+5 AND "+ ips +" BETWEEN ipMin-5 AND ipMax+5 AND " + ins + " BETWEEN inMin-5 AND inMax+5 AND "+ temp_sop +" BETWEEN sopMin-1 AND sopMax+1 AND "+ temp_son +" BETWEEN sonMin-1 AND sonMax+1 AND " + temp_sfp +" BETWEEN sfpMin-1 AND sfpMax+1 AND "+ temp_sfn +" BETWEEN sfnMin-1 AND sfnMax+1 AND "+ temp_dp +" BETWEEN dpMin-1 AND dpMax+1 AND "+ temp_dn +" BETWEEN dnMin-1 AND dnMax+1";
    //var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + mp + " BETWEEN mpMin-10 AND mpMax+10 AND " + mn + " BETWEEN mnMin-10 AND mnMax+10 AND "+ ips +" BETWEEN ipMin-10 AND ipMax+10 AND " + ins + " BETWEEN inMin-10 AND inMax+10";
    //var query = "SELECT userNum FROM LOGINEOGFP1 WHERE " + temp_sop +" BETWEEN sopMin-3 AND sopMax+3 AND "+ temp_son +" BETWEEN sonMin-3 AND sonMax+3 AND " + temp_sfp +" BETWEEN sfpMin-3 AND sfpMax+3 AND "+ temp_sfn +" BETWEEN sfnMin-3 AND sfnMax+3 AND "+ temp_dp +" BETWEEN dpMin-3 AND dpMax+3 AND "+ temp_dn +" BETWEEN dnMin-3 AND dnMax+3";

    console.log(query);
    var result = client.query(query);
    if(result.length == 0){
      return 5;
    }
    else {
      return result;
    }
  }
  else {
    return 5;
  }
}

function getG3forCheck_fp2 (y, mp, mn, ips, ins) {
  if(mp != 0 && mp != 1 && mn != 199 && mn != 200){
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
      if(flag3 == true)
        return true
      if(data == mp && flag1 == false){
        temp_index = index;
        flag1 = true;
      }
      else if(index > temp_index && data >= 100 && flag1 == true && flag2 == false){
        temp_sfp = (index - temp_index) / mp;
        temp_dp = index;
        temp_dn = y.length -1 -index;
        console.log(temp_dn);
        flag2 = true;
      }
      else if (index > temp_index && data == mn && flag2 == true && flag3 == false){
        temp_index2 = index;
        temp_sfn = (temp_dn - ins)/mn;
        flag3 = true;
      }
    });
    temp_sop = temp_sop.toFixed(2);
    temp_son = temp_son.toFixed(2);
    temp_sfp = temp_sfp.toFixed(2);
    temp_sfn = temp_sfn.toFixed(2);
    validFp2 = true;
    var query = "SELECT userNum FROM LOGINEOGFP2 WHERE " + mp + " BETWEEN mpMin-5 AND mpMax+5 AND " + mn + " BETWEEN mnMin-5 AND mnMax+5 AND "+ ips +" BETWEEN ipMin-5 AND ipMax+5 AND " + ins + " BETWEEN inMin-5 AND inMax+5 AND "+ temp_sop +" BETWEEN sopMin-1 AND sopMax+1 AND "+ temp_son +" BETWEEN sonMin-1 AND sonMax+1 AND " + temp_sfp +" BETWEEN sfpMin-1 AND sfpMax+1 AND "+ temp_sfn +" BETWEEN sfnMin-1 AND sfnMax+1 AND "+ temp_dp +" BETWEEN dpMin-1 AND dpMax+1 AND "+ temp_dn +" BETWEEN dnMin-1 AND dnMax+1";
    //var query = "SELECT userNum FROM LOGINEOGFP2 WHERE " + mp + " BETWEEN mpMin-10 AND mpMax+10 AND " + mn + " BETWEEN mnMin-10 AND mnMax+10 AND "+ ips +" BETWEEN ipMin-10 AND ipMax+10 AND " + ins + " BETWEEN inMin-10 AND inMax+10";
    //var query = "SELECT userNum FROM LOGINEOGFP2 WHERE " + temp_sop +" BETWEEN sopMin-3 AND sopMax+3 AND "+ temp_son +" BETWEEN sonMin-3 AND sonMax+3 AND " + temp_sfp +" BETWEEN sfpMin-3 AND sfpMax+3 AND "+ temp_sfn +" BETWEEN sfnMin-3 AND sfnMax+3 AND "+ temp_dp +" BETWEEN dpMin-3 AND dpMax+3 AND "+ temp_dn +" BETWEEN dnMin-3 AND dnMax+3";
    console.log(query);
    var result = client.query(query);
    if(result.length == 0){
      return 5;
    }
    else {
      return result;
    }
  }
    else {
      return 5;
    }
}


const isVaild = (x, TwoY, range) => {
		let tol = 1;
    for (let i = 0; i < range; i++) {
        if (temp[x - i] >= TwoY[range - i] -2 && temp[x - i] <= TwoY[range - i] +2) {
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
        if (temp_fp2[x - i] >= ThreeY[range - i] -2 && temp_fp2[x - i] <= ThreeY[range - i] +2) {
            ;
        }
        else {
            return false;
        }
    }
    return true;
}

gpio.wiringPiSetup();
gpio.pinMode(BLUE, gpio.OUTPUT);
gpio.pinMode(RED, gpio.OUTPUT);
gpio.pinMode(GREEN, gpio.OUTPUT);

module.exports = router;
