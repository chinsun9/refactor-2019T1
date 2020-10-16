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

const TurnOff = () => {
  gpio.digitalWrite(BLUE, 0);
  gpio.digitalWrite(RED, 0);
  gpio.digitalWrite(GREEN, 0);
  // setTimeout(TurnOn, 300);
  // console.log("안녕캬캬캬캬ㅑ")
}

const TurnOn = () => {
  gpio.digitalWrite(BLUE, 1);
  gpio.digitalWrite(RED, 1);
  gpio.digitalWrite(GREEN, 1);
  setTimeout(TurnOff2, 300);
}

const TurnOff2 = () => {
  gpio.digitalWrite(BLUE, 0);
  gpio.digitalWrite(RED, 0);
  gpio.digitalWrite(GREEN, 0);
}

router.post('/', (req, res)=>{

  gpio.digitalWrite(BLUE, 1);
  gpio.digitalWrite(RED, 1);
  gpio.digitalWrite(GREEN, 1);
  setTimeout(TurnOff, 600);

  let userNum = req.body.userNum;
  let query = "SELECT * FROM USER WHERE userNum = " + userNum;
  var result_user = client.query(query);
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  let login_user = new Object();

  login_user.userNum = result_user[0].userNum;
  login_user.userId = result_user[0].userId;
  login_user.userName = result_user[0].userName;
  res.end(JSON.stringify(login_user));
  console.log(JSON.stringify(login_user));
});

gpio.wiringPiSetup();
gpio.pinMode(BLUE, gpio.OUTPUT);
gpio.pinMode(RED, gpio.OUTPUT);
gpio.pinMode(GREEN, gpio.OUTPUT);

module.exports = router;
