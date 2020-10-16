const express = require('express');
const router = express.Router();
const gpio = require('node-wiring-pi');
const g1 = require('./g1.js');
const LED1 = 27;
const LED2 = 28;
const LED3 = 29;


var temp = new Array();
var resultArr =  new Array();
var fisrtZero = new Array();
var secondZero = new Array();
var thirdZero = new Array();
var arrLenth = 0;

var mp = new Array();
var mn = new Array();
var ips = new Array();
var ins = new Array();
var count = 0;

var checkDB = false;
var checkLoginOk = false;

router.get('/', (req, res) => {
    console.log('get!');
    res.send('eeg!');
});

router.post('/', (req, res) => {
		// console.log("원본짱짱 TwoY 배열크기" + req.body.TwoY.length);
		// console.log(req.body.TwoY);

      if(arrLenth >= 20 && checkDB == false && checkLoginOk == false){
        res.send("충분한 데이터 누적");
        resultArr.forEach( (y) => {
          g1.g1(y, mp, mn, ips, ins, count++);
      });

      var sum = 0;
      mp.forEach((data)=>{
        sum += data;
      });
      sum = sum / mp.length;
      console.log("평균 : " + sum);
      var total = 0;
      mp.forEach((data)=>{
        total += (data-sum) * (data-sum);
      });
      total = total/mp.length;
      console.log("분산 : " + total);
      console.log("표준편차 : " + Math.sqrt(total));
      total = Math.sqrt(total);
      mp.forEach((data,index)=>{
        if(data > sum + total || data < sum - total){
          mp.splice(index,1);
          mn.splice(index,1);
          ips.splice(index,1);
          ins.splice(index,1);
        }
      });

      mp.forEach((data, index) => {
        console.log("Mp : " + data + "    Mn : " + mn[index] + "    Ip : " + ips[index] + "    In : " + ins[index]);
      });
      checkDB = true;
    }
    else{
    let TwoY = null;
    TwoY = req.body.TwoY;
    console.log("TwoY 배열크기" + TwoY.length);

    // 처음 배열을 받는다면 temp로 덮어쓰고 종료
    if (temp.length == 0) {
        // 깊은 복사

        temp = JSON.parse(JSON.stringify(TwoY));
        console.log('first input!');
        res.send("hello");
        // 코드종료
    }
    else {
        //배열 합치기

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
            gpio.digitalWrite(LED2, 1);
            setTimeout(TurnOff, 1000);
            temp =  [];
		        res.send("hello");

        }else{
					// console.log("1");

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
            if(checkDB == true){
                checkLoginOk = g1.g1forCheck(result.slice( checkPoint1, checkPoint3 ), mp, mn, ips, ins, count++);
                if(checkLoginOk == true){
                  checkLoginOk = false;
                }
            }
            else{
						// 뽑은 특징 배열 저장.
  						gpio.digitalWrite(LED3, 1);
  						setTimeout(TurnOff, 1000);
  						resultArr[arrLenth++] = result.slice( checkPoint1, checkPoint3 );

  						console.log(resultArr[arrLenth-1]);
  						console.log(arrLenth);
            }
					}
          else{
            gpio.digitalWrite(LED1, 1);
            setTimeout(TurnOff, 1000);
          }

					// console.log("3");
					// 추출끝나면 temp로 덮어쓰기

					temp = JSON.parse(JSON.stringify(TwoY));

					//console.log("첫쨰배열크기" + temp.length);
					//console.log("합쳐진 크기" + result.length);
					res.send('eeg!');
				}
    }
}});


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

const TurnOff = () => {

	gpio.digitalWrite(LED1, 0);
  gpio.digitalWrite(LED2, 0);
  gpio.digitalWrite(LED3, 0);
}

const checkLogin = (result) => {
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
    // 뽑은 특징 배열 저장.
    gpio.digitalWrite(LED3, 1);
    setTimeout(TurnOff, 1000);
    resultArr[arrLenth++] = result.slice( checkPoint1, checkPoint3 );

    console.log(resultArr[arrLenth-1]);
    console.log(arrLenth);
  }
  else{
    gpio.digitalWrite(LED1, 1);
    setTimeout(TurnOff, 1000);
  }
};

gpio.setup('wpi');
gpio.pinMode(LED2, gpio.OUTPUT);
gpio.pinMode(LED3, gpio.OUTPUT);
gpio.pinMode(LED1, gpio.OUTPUT);

module.exports = router;
