const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const gangalionLogin = require('./login/login.js');
const ganglinRegister = require('./register/register.js');
const ganglionToken = require('./register/index.js');
const ganglionAnalysis = require('./analysis/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/logintest', gangalionLogin);
app.use('/registertest', ganglinRegister);
app.use('/register/index', ganglionToken);
app.use('/ganglion/analysis/index', ganglionAnalysis);
//app.use('/g1', g1);

app.listen(65003, () => {
	console.log('server running at http://192.9.45.80:65003');
});
