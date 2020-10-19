const express = require('express');
const router = express.Router();

const client = require('../../utils/mysql');

var serviceOrder = new Array();
var myString = [
  'lieTimeService',
  'getSleepTimeService',
  'wakeUpTimeService',
  'remSleepService',
  'stage12SleepService',
  'stage34SleepService',
  'totalSleepTimeService',
  'sleepEfficiencyService',
  'dailySleepTimeService',
];
var myStringOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// 웹 편집 위해 빠른 로그인 없이 보이기
router.get('/', (req, res) => {
  if (typeof req.session.userNum == 'undefined') {
    console.log(new Date() + '] 쿠키없는 접근');

    res.render('chinsung_404.ejs', {
      msg: 'Session expiration',
    });
    return;
  }

  let myResults = '';
  myResults = client.query(
    'select * from SERVICEEOGORDER where userNum=' + req.session.userNum
  );

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

  let tempName = '';
  myResults = client.query(
    'select * from USER where userNum = ' + req.session.userNum
  );
  myResults.forEach((item, index) => {
    tempName = item.userName;
  });

  res.render('chinsung_setting', {
    orderCard: myStringOrder,
    orderList: myString,
    title: 'Setting',
    userName: tempName,
  });
});

router.post('/', (req, res) => {
  serviceOrder = req.body.arr;
  console.log(serviceOrder);
  let myResults = client.query(
    'delete from SERVICEEOGORDER where userNum = ' + req.session.userNum
  );
  myResults = client.query(
    'insert into SERVICEEOGORDER values (' +
      req.session.userNum +
      ', ' +
      serviceOrder[0] +
      ', ' +
      serviceOrder[1] +
      ', ' +
      serviceOrder[2] +
      ', ' +
      serviceOrder[3] +
      ', ' +
      serviceOrder[4] +
      ', ' +
      serviceOrder[5] +
      ', ' +
      serviceOrder[6] +
      ', ' +
      serviceOrder[7] +
      ', ' +
      serviceOrder[8] +
      ')'
  );

  //디비에 배열 저장!

  res.redirect('/web/setting/index');
});

module.exports = router;
