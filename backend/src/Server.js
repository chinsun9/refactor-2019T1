const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const css = require('./web/web/css.js');
const js = require('./web/web/js.js');
const vendor = require('./web/web/vendor.js');

const weblogin = require('./web/routes/user/login.js');
const webIndex = require('./web/routes/test.js');
const webregister = require('./web/routes/user/register.js');
const weblogout = require('./web/routes/user/logout.js');
const webMain = require('./web/routes/main/index.js');
const webProfile = require('./web/routes/profile/index.js');
const webRegisterEOG = require('./web/routes/profile/register.js');
const webAbout = require('./web/routes/about/index.js');
const webTool = require('./web/routes/about/tool.js');
const webSetting = require('./web/routes/setting/index.js');
const webPwChange = require('./web/routes/profile/change.js');

if (process.env.NODE_ENV === 'web_only') {
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

app.set('views', './web/web'); // 기본 디렉터리 바꾸기.
app.set('view engine', 'ejs');
app.use(express.static('./web/web/img')); // 이미지 경로 설정  //출처: https://alexband.tistory.com/16 [GoodBye World]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

//css, js, vendor 설정
app.use('/web/css', css);
app.use('/web/js', js);
app.use('/web/vendor', vendor);
app.use('/web/user/css', css);
app.use('/web/user/js', js);
app.use('/web/user/vendor', vendor);
app.use('/web/main/css', css);
app.use('/web/main/js', js);
app.use('/web/main/vendor', vendor);
app.use('/web/profile/css', css);
app.use('/web/profile/js', js);
app.use('/web/profile/vendor', vendor);
app.use('/web/about/css', css);
app.use('/web/about/js', js);
app.use('/web/about/vendor', vendor);
app.use('/web/setting/css', css);
app.use('/web/setting/js', js);
app.use('/web/setting/vendor', vendor);

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

app.use('/', webIndex);

// ipv4 형식으로 ip보기위해 '0.0.0.0' 추가
app.listen(65002, '0.0.0.0', () => {
  console.log('server running at  http://localhost:65002');
});
