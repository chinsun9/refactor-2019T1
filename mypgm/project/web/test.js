const fs = require('fs');
const express = require('express');
const router = express.Router();
const ejs = require('ejs');


router.get('/', (req, res) => {

	res.redirect("/web/login");
	//
	// fs.readFile('./web/test.html', 'utf8', (err, data) => {
	// 	res.writeHead(200, {'Content-Type': 'text/html'});
	// 	res.write('<meta charset=utf8>');
	// 	res.end(data);
	// });
});


router.get('/test', (req, res) => {
	res.render('chinsung_test',{
		title: 'dd'
	})

});



module.exports = router;
