const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const css = require('./web/web/css.js');
const js = require('./web/web/js.js');
const vendor = require('./web/web/vendor.js');

const registerToken = require('./ganglion/register/index.js');
const weblogin = require('./web/login.js');
const webregister = require('./web/user/register.js');
const weblogout = require('./web/user/logout.js');
const webMain = require('./web/main/index.js');
const webProfile = require('./web/profile/index.js');
const webRegisterEOG = require('./web/profile/register.js');
const webAbout = require('./web/about/index.js');
const webSetting = require('./web/setting/index.js');
const webPwChange = require('./web/profile/change.js');
const webIndex = require('./web/test.js');

app.set('views', './web/web');	// 기본 디렉터리 바꾸기.
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret key',
	resave: false,
	saveUninitialized: true
}));
app.use(cookieParser());


app.use('/ganglion/index', registerToken);

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
app.use('/web/setting/index', webSetting);



app.use('/',webIndex)


// ipv4 형식으로 ip보기위해 '0.0.0.0' 추가
app.listen(65002, '0.0.0.0',() => {
	console.log("server running at 65002");
});
