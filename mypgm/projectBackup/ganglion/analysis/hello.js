const express = require("express");
const router = express.Router();
const fs = require('fs');
const mysql = require('sync-mysql');
const gpio = require('node-wiring-pi');

const BLUE = 29;
const RED = 28;
const GREEN = 27;

const client = new mysql({
        host: 'localhost',
        user: 'root',
        password: 'gachon654321',
        database: 'luciddb'
});

var serviceArr = new Array();
var preBetaService = 0;
var preAlphaService = 0;
var startSleepService = false;
var shallowSleepService = false;
var preSleepService = -1;
var deepSleepService = false;

const TurnOff = () => {
  gpio.digitalWrite(GREEN, 0);
  gpio.digitalWrite(BLUE, 0);
  gpio.digitalWrite(RED, 0);
}

router.post('/', (req, res) => {
	var date = new Date();
	console.log(req.body);
	if(req.body.status == "start"){
		fs.writeFile('data_'+req.body.userNum+'.txt', req.body.BpData+"," +date+"$\n", 'utf8', (err) => {
			let today = new Date();
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
			check_first = true;
			res.end("2");
		});
	}
	else if(req.body.status == "service"){
		fs.appendFile('data_'+req.body.userNum+'.txt', req.body.BpData+","+date+"$\n", 'utf8', (err) => {
      fs.readFile('data_'+req.body.userNum+'.txt', 'utf8', (err, data)=>{
        if(serviceArr.length <= 10){
          var arr_sleep = data.split("$");
          serviceArr[serviceArr.length] = arr_sleep[arr_sleep.length-1];
        }
        else{
          if(startSleepService == false){
            var tempAlpha = 0;
            var tempBeta = 0;
            for(let i = 0; i < serviceArr.length; i++){
              var arr_sleep_temp = serviceArr[i].split(',');
              arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
              arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
              arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
              arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
              arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
              tempAlpha += arr_sleep_temp[2];
              tempBeta += arr_sleep_temp[3];
            }
            if(preBetaService > preAlphaService && tempBeta < tempAlpha){
              startSleepService = true;
              shallowSleepService = true;
              gpio.digitalWrite(GREEN, 1);
            }
            else{
              preBetaService = tempBeta;
              preAlphaService = tempAlpha;
              tempBeta = 0;
              tempAlpha = 0;
            }
          }
          else if((preSleepService == -1 || preSleepService == 3) && shallowSleepService == true){
            let judge = true;
            for(let i = 0; i < serviceArr.length; i++){
              var arr_sleep_temp = serviceArr.split(',');

              arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
              arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
              arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
              arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
              arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
              if(arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4] <= 0){
                judge = false;
              }
            }
            if(judge == true){
              preSleepService = 1;
              shallowSleepService = false;
              deepSleepService = true;
              gpio.digitalWrite(GREEN, 0);
            }
          }
          else if(preSleepService == 1 && deepSleepService == true){
            let judge = true;
            for(let i = 0; i < serviceArr.length; i++){
              var arr_sleep_temp = serviceArr[i].split(',');
              arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
              arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
              arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
              arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
              arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
              if(arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4] >= 0){
                judge = false;
              }
            }
            if(judge == true){
              preSleepService = 3;
              deepSleepService = false;
              shallowSleepService = true;
              gpio.digitalWrite(GREEN, 1);
            }
          }
          serviceArr = [];
        }
      });
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
		  res.end("2");
		});
	}
	else if(req.body.status == "stop"){
    gpio.digitalWrite(GREEN, 0);

    gpio.digitalWrite(GREEN, 1);
    gpio.digitalWrite(BLUE, 1);
    gpio.digitalWrite(RED, 1);
    setTimeout(TurnOff, 1000);

		fs.appendFile('data_'+req.body.userNum+'.txt', req.body.BpData+","+date, 'utf8', (err) => {
			fs.readFile('data_'+req.body.userNum+'.txt', 'utf8', (err, data)=>{

				var arr_sleep = data.split("$");
				var temp = arr_sleep[0].split(',');
				var timeLie = new Date(temp[5]);
        var timeTemp = new Date();
				temp = arr_sleep[arr_sleep.length-1].split(',');
				var timeWakeUp = new Date(temp[5]);
				var timeSleep;
				var shallowSleep = false;
				var deepSleep = false;
				var remSleep = false;
				var startSleep = false;
				var preSleep = -1;
				var length;
				var tempAlpha = 0;
				var tempBeta = 0;
				var preBeta = 0;
				var preAlpha = 0;
				var countMove = 0;

				var timeShallow=0;
				var timeDeep=0;

				var tempCount = 0;


				while(true){
					if(arr_sleep.length < 10)
						length = arr_sleep.length;
					else {
						length = 10;
					}
					//수면 시작 판단
					if(startSleep == true || startSleep == false){
						for(let i = 0; i < length; i++){
							var arr_sleep_temp = arr_sleep[i].split(',');
							if(arr_sleep_temp[1] <= 100 && arr_sleep_temp[1] >= 99){
								countMove++;
								length--;
								arr_sleep.splice(i,1);
								i = 0;
							}
						}
					}
					if(startSleep == false){
						for(let i = 0; i < length; i++){
							var arr_sleep_temp = arr_sleep[i].split(',');

							arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
							arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
							arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
							arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
							arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
							tempAlpha += arr_sleep_temp[2];
							tempBeta += arr_sleep_temp[3];
						}
						if(preBeta > preAlpha && tempBeta < tempAlpha){
							var arr_sleep_temp = arr_sleep[0].split(',');
							startSleep = true;
							shallowSleep = true;
							timeTemp = new Date(arr_sleep_temp[5]);
							timeSleep = new Date(arr_sleep_temp[5]);
							fs.writeFile('log.txt', "수면 시작시간"+arr_sleep_temp[5]+"\n", 'utf8', (err) => {
							});
						}
						else {
							preBeta = tempBeta;
							preAlpha = tempAlpha;
							tempBeta = 0;
							tempAlpha = 0;
						}
					}
					else if((preSleep == -1 || preSleep == 3) && shallowSleep == true){
						let judge = true;
						for(let i = 0; i < length; i++){
							var arr_sleep_temp = arr_sleep[i].split(',');

							arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
							arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
							arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
							arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
							arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
							console.log(arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4]);
							if(arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4] <= 0){
								judge = false;
							}
						}
						if(judge == true){
							tempCount++;
							console.log("333");
							var arr_sleep_temp = arr_sleep[0].split(',');
							preSleep = 1;
							shallowSleep = false;
							deepSleep = true;
							timeShallow += (new Date(arr_sleep_temp[5])-timeTemp);
							timeTemp = new Date(arr_sleep_temp[5]);
							fs.appendFile('log.txt', "깊은 수면 시작시간"+arr_sleep_temp[5]+"\n", 'utf8', (err) => {
							});
						}
					}
					else if(preSleep == 1 && deepSleep == true){
						let judge = true;
						for(let i = 0; i < length; i++){
							var arr_sleep_temp = arr_sleep[i].split(',');

							arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
							arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
							arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
							arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
							arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
							if(arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4] >= 0){
								judge = false;
							}
						}
						if(judge == true){
							console.log("111");
							var arr_sleep_temp = arr_sleep[0].split(',');
							preSleep = 3;
							deepSleep = false;
							shallowSleep = true;
							timeDeep += (new Date(arr_sleep_temp[5])-timeTemp);
							timeTemp = new Date(arr_sleep_temp[5]);
							fs.appendFile('log.txt', "얉은 수면 시작시간"+arr_sleep_temp[5]+"\n", 'utf8', (err) => {
							});
						}
					}
					arr_sleep.splice(0, length);
					if(arr_sleep.length == 0){
						console.log("분석종료");
						timeShallow += (new Date(arr_sleep_temp[5])-timeTemp);
						fs.appendFile('log.txt', "뒤척인 수 "+countMove+"\n", 'utf8', (err) => {
						});
						console.log(timeLie);

						console.log(tempCount);
						console.log("INSERT INTO SERVICEEOG VALUES("+req.body.userNum+",CURDATE(),"+timeLie+","+timeSleep+","+timeWakeUp+","+countMove+","+timeShallow/1000+","+timeDeep/1000+")");
						client.query("INSERT INTO SERVICEEOG VALUES("+req.body.userNum+",SYSDATE(),'"+ timeLie.getFullYear() + "-" + timeLie.getMonth() + "-" + timeLie.getDate() + " " + timeLie.getHours() + ":" + timeLie.getMinutes() + ":" + timeLie.getSeconds() +"','"+ timeSleep.getFullYear() + "-" + timeSleep.getMonth() + "-" + timeSleep.getDate() + " " + timeSleep.getHours() + ":" + timeSleep.getMinutes() + ":" + timeSleep.getSeconds() +"','"+ timeWakeUp.getFullYear() + "-" + timeWakeUp.getMonth() + "-" + timeWakeUp.getDate() + " " + timeWakeUp.getHours() + ":" + timeWakeUp.getMinutes() + ":" + timeWakeUp.getSeconds() +"',"+countMove+","+timeShallow/1000+","+timeDeep/1000+")");
						break;
					}
				}
			});
		});
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
		res.end("6");
	}
});

function trimData3(data) {
    if (data >= 76) {
      data *= 100
    }
    else if (data >= 33) {
      data *= 10
    }
  return data
}

router.get('/', (req, res) => {
	console.log("hello"+res);

});

gpio.wiringPiSetup();
gpio.pinMode(BLUE, gpio.OUTPUT);
gpio.pinMode(RED, gpio.OUTPUT);
gpio.pinMode(GREEN, gpio.OUTPUT);

module.exports = router;
