const mysql = require('mysql');
const http = require('http');

var client = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'gachon654321',
	database: 'luciddb'
});

http.createServer((req, res) => {

	client.query('select * from luciddb.AREA', (err, data) => {
		console.log(data[0]);
	});
}).listen(65002, () => {

});
