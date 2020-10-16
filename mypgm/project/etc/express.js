const express = require('express');
const app = express();
const test = require('./test.js');
const bodyParser = require('body-parser');
const eeg = require('./eeg.js');
//const g1 = require('./g1.js');
const dbtest = require('./dbtest.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/test', test);
app.use('/eeg', eeg);
app.use('/dbtest', dbtest);
//app.use('/g1', g1);

app.listen(65001, () => {
	console.log('server running at http://192.9.45.80:65001');
});
