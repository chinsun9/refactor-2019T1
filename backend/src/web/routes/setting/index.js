const express = require('express');
const router = express.Router();
const client = require('../../utils/mysql');
const chk_session = require('../../utils/chk-session');

let serviceOrder = new Array();
const myString = [
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
let myStringOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0];

router.use(chk_session);

router.get('/', (req, res) => {
  if (typeof req.session.userNum == 'undefined') {
    throw new Error('no session');
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
