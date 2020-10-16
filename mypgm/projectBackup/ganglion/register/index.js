const express = require("express");
const router = express.Router();
const crypto = require('crypto');

var key = 'This is super key';

router.post('/', (req, res) => {
	var date = new Date();
	console.log(date.getTime() + "");

	var cipher = crypto.createCipher('aes192', key);
	cipher.update(date.getTime().toString(), 'utf8', 'base64');
	var cipherOutput = cipher.final('base64');

	console.log(cipherOutput.substring(0,6));
	res.send(cipherOutput.substring(0,6));
	//res.send(JSON.parse('{"token":"' + cipherOutput.substring(0, 6) + '"}'));
});

module.exports = router;
