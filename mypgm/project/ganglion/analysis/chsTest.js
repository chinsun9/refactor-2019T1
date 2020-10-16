const express = require("express");
const router = express.Router();
const fs = require('fs');
const mysql = require('sync-mysql');

const client = new mysql({
    host: 'localhost',
    user: 'root',
    password: 'gachon654321',
    database: 'luciddb'
});

router.post('/', (req, res) => {
    console.log("chs : 3단계바로 실행하기")
    console.log(req.body);

    if (req.body.status == "stop") {

        fs.readFile('data_' + req.body.userNum + '.txt', 'utf8', (err, data) => {

            var arr_sleep = data.split("$");
            var totalLine = arr_sleep.length
            var line = 0;
            var temp = arr_sleep[0].split(',');
            var timeLie = new Date(temp[5]);
            var timeSleep = new Date(temp[5]);
            var timeTemp = new Date();
            temp = arr_sleep[arr_sleep.length - 1].split(',');
            var timeWakeUp = new Date(temp[5]);
            var shallowSleep = false;
            var deepSleep = false;
            var startSleep = false;
            var preSleep = -1;
            var length;
            var tempAlpha = 0;
            var tempBeta = 0;
            var preBeta = 0;
            var preAlpha = 0;
            var countMove = 0;

            var timeShallow = 0;
            var timeDeep = 0;



            while (true) {
                if (arr_sleep.length < 10)
                    length = arr_sleep.length;
                else {
                    length = 10;
                }
                line += length;
                //수면 시작 판단
                if (startSleep == true || startSleep == false) {
                    for (let i = 0; i < length; i++) {
                        var arr_sleep_temp = arr_sleep[i].split(',');
                        if (arr_sleep_temp[1] <= 100 && arr_sleep_temp[1] >= 99) {
                            countMove++;
                            length--;
                            arr_sleep.splice(i, 1);
                            i = 0;
                        }
                    }
                }
                if ((arr_sleep.length <= 0 || typeof arr_sleep[0] == 'undefined' || arr_sleep[0] == null) && line >= totalLine - 1) {
                    console.log("분석종료");
                    timeShallow += (new Date(arr_sleep_temp[5]) - timeTemp);
                    fs.appendFile('log.txt', "뒤척인 수 " + countMove + "\n", 'utf8', (err) => {
                    });

                    var chsST = timeWakeUp.getMonth()+1
                    var chsLT = timeLie.getMonth()+1
                    var chsSLT = timeWakeUp.getMonth()+1
                    var chsWT = timeWakeUp.getMonth()+1

                    console.log("INSERT INTO SERVICEEOG VALUES(" + req.body.userNum + ",CURDATE()," + timeLie + "," + timeSleep + "," + timeWakeUp + "," + countMove + "," + timeShallow / 1000 + "," + timeDeep / 1000 + ")");
                    if (timeLie.getTime() != timeSleep.getTime()) {
                        console.log("디비저장됨!");
                        client.query("INSERT INTO SERVICEEOG VALUES(" + req.body.userNum + ",'" + timeWakeUp.getFullYear() + "-" + chsST + "-" + timeWakeUp.getDate() + " " + timeWakeUp.getHours() + ":" + timeWakeUp.getMinutes() + ":" + timeWakeUp.getSeconds() + "','" + timeLie.getFullYear() + "-" + chsLT + "-" + timeLie.getDate() + " " + timeLie.getHours() + ":" + timeLie.getMinutes() + ":" + timeLie.getSeconds() + "','" + timeSleep.getFullYear() + "-" + chsSLT + "-" + timeSleep.getDate() + " " + timeSleep.getHours() + ":" + timeSleep.getMinutes() + ":" + timeSleep.getSeconds() + "','" + timeWakeUp.getFullYear() + "-" + chsWT + "-" + timeWakeUp.getDate() + " " + timeWakeUp.getHours() + ":" + timeWakeUp.getMinutes() + ":" + timeWakeUp.getSeconds() + "'," + countMove + "," + timeShallow / 1000 + "," + timeDeep / 1000 + ")");
                    }
                    break;
                }
                if (startSleep == false) {
                    for (let i = 0; i < length; i++) {
                        var arr_sleep_temp = arr_sleep[i].split(',');

                        arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
                        arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
                        arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
                        arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
                        arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
                        tempAlpha += arr_sleep_temp[2];
                        tempBeta += arr_sleep_temp[3];
                    }
                    if (preBeta > preAlpha && tempBeta < tempAlpha) {
                        var arr_sleep_temp = arr_sleep[0].split(',');
                        startSleep = true;
                        shallowSleep = true;
                        timeTemp = new Date(arr_sleep_temp[5]);
                        timeSleep = new Date(arr_sleep_temp[5]);
                        fs.writeFile('log.txt', "수면 시작시간" + arr_sleep_temp[5] + "\n", 'utf8', (err) => {
                        });
                    }
                    else {
                        preBeta = tempBeta;
                        preAlpha = tempAlpha;
                        tempBeta = 0;
                        tempAlpha = 0;
                    }
                }
                else if ((preSleep == -1 || preSleep == 3) && shallowSleep == true) {
                    let judge = true;
                    for (let i = 0; i < length; i++) {
                        var arr_sleep_temp = arr_sleep[i].split(',');

                        arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
                        arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
                        arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
                        arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
                        arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
                        console.log(arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4]);
                        if (arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4] <= 0) {
                            judge = false;
                        }
                    }
                    if (judge == true) {
                        var arr_sleep_temp = arr_sleep[0].split(',');
                        preSleep = 1;
                        shallowSleep = false;
                        deepSleep = true;
                        timeShallow += (new Date(arr_sleep_temp[5]) - timeTemp);
                        timeTemp = new Date(arr_sleep_temp[5]);
                        fs.appendFile('log.txt', "깊은 수면 시작시간" + arr_sleep_temp[5] + "\n", 'utf8', (err) => {
                        });
                    }
                }
                else if (preSleep == 1 && deepSleep == true) {
                    let judge = true;
                    for (let i = 0; i < length; i++) {
                        var arr_sleep_temp = arr_sleep[i].split(',');

                        arr_sleep_temp[0] = trimData3(arr_sleep_temp[0]);
                        arr_sleep_temp[1] = trimData3(arr_sleep_temp[1]);
                        arr_sleep_temp[2] = trimData3(arr_sleep_temp[2]);
                        arr_sleep_temp[3] = trimData3(arr_sleep_temp[3]);
                        arr_sleep_temp[4] = trimData3(arr_sleep_temp[4]);
                        if (arr_sleep_temp[0] - arr_sleep_temp[1] - arr_sleep_temp[2] - arr_sleep_temp[3] - arr_sleep_temp[4] >= 0) {
                            judge = false;
                        }
                    }
                    if (judge == true) {
                        var arr_sleep_temp = arr_sleep[0].split(',');
                        preSleep = 3;
                        deepSleep = false;
                        shallowSleep = true;
                        timeDeep += (new Date(arr_sleep_temp[5]) - timeTemp);
                        timeTemp = new Date(arr_sleep_temp[5]);
                        fs.appendFile('log.txt', "얉은 수면 시작시간" + arr_sleep_temp[5] + "\n", 'utf8', (err) => {
                        });
                    }
                }
                arr_sleep.splice(0, length);
            }
        });

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
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
    console.log("hello" + res);
});


module.exports = router;
