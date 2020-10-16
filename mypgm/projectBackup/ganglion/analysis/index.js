const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express');


const bodyParser = require('body-parser');

const hello = require('./hello.js');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 테스트
app.use('/ganglion/analysis/index', hello)

app.listen('65005', '0.0.0.0',() => {
	console.log("server running at 65005");
});
