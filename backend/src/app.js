const createError = require('http-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const weblogin = require('./web/routes/user/login.js');
const webIndex = require('./web/routes/index.js');
const webregister = require('./web/routes/user/register.js');
const weblogout = require('./web/routes/user/logout.js');
const webMain = require('./web/routes/main/index.js');
const webProfile = require('./web/routes/profile/index.js');
const webRegisterEOG = require('./web/routes/profile/register.js');
const webAbout = require('./web/routes/about/index.js');
const webTool = require('./web/routes/about/tool.js');
const webSetting = require('./web/routes/setting/index.js');
const webPwChange = require('./web/routes/profile/change.js');

// 데탑에서 갱글리온 관련 라우터를 못돌리는 문제
if (process.env.NODE_ENV !== 'skip_ganglion') {
  const registerToken = require('./ganglion/register/index.js');
  const gangalionLogin = require('./ganglion/login/login.js');
  const gangalionLoginChsTest = require('./ganglion/login/chsLoginTest.js');
  const gangalionLoginTest = require('./ganglion/login/logintest.js');
  const ganglinRegister = require('./ganglion/register/register.js');
  const ganglinRegisterChsTest = require('./ganglion/register/chsRegisterTest.js');
  const ganglionAnalysis = require('./ganglion/analysis/index.js');
  const ganglionAnalysisChsTest = require('./ganglion/analysis/chsTest.js');

  app.use('/ganglion/index', registerToken);
  app.use('/ganglion/login', gangalionLogin);
  app.use('/ganglion/logintest', gangalionLoginTest);
  app.use('/ganglion/register', ganglinRegister);
  app.use('/ganglion/register2', ganglinRegisterChsTest);
  app.use('/ganglion/analysis/index', ganglionAnalysis);
  app.use('/ganglion/chsLoginTest', gangalionLoginChsTest); //chs;
  app.use('/ganglion/analysis/index2', ganglionAnalysisChsTest); //chs;  바로 로그아웃해서 디비에 저장하는 url
}

app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    key: 'sid',
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/', webIndex);
app.use('/web/login', weblogin);
app.use('/web/user/register', webregister);
app.use('/web/user/logout', weblogout);
app.use('/web/main/index', webMain);
app.use('/web/profile/index', webProfile);
app.use('/web/profile/change', webPwChange);
app.use('/web/profile/register', webRegisterEOG);
app.use('/web/about/index', webAbout);
app.use('/web/about/tool', webTool);
app.use('/web/setting/index', webSetting);

// 404 handle
app.use(function (req, res, next) {
  console.log(` next(createError(404));`);
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(`res.render('error');`);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('chinsung_404', { msg: res.locals.message });
});

// ipv4 형식으로 ip보기위해 '0.0.0.0' 추가
app.listen(65002, '0.0.0.0', () => {
  console.log('server running at  http://localhost:65002');
});
