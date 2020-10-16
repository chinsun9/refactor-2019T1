const fs = require('fs');
const express = require('express');
const router = express.Router();
const ejs = require('ejs');


router.get('/', (req, res) => {
	fs.readFile('./web/test.html', 'utf8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<meta charset=utf8>');
		res.end(data);
	});
});


router.get('/test', (req, res) => {

		fs.readFile('./views/test.ejs', 'utf8', (err, data) => {
			res.end(ejs.render(data))
		});

});



module.exports = router;
