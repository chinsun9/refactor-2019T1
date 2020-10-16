const express = require('express');
const app = express();
const login = require('./login/login.js');
const test = require('./login/test.js');
const register = require('./register/register.js');
const token = require('./register/index.js');
const bodyParser = require('body-parser');
const hello = require('./analysis/hello.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/logintest', login);
app.use('/test', test);
app.use('/registertest', register);
app.use('/register/index', token);
app.use('/ganglion/analysis/index', hello);
//app.use('/g1', g1);

app.listen(65003, () => {
	console.log('server running at http://192.9.45.80:65003');
});
