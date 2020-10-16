const http = require("http");
http.createServer((req, res) => {
	console.log("들어옴");
	res.writeHead(200, 'utf8', {'Content-Type':'text/html; charset=utf8'});
	res.end('<h1>졸프코인 떡상 가즈아!</h1>');
}).listen(65001, () => {
	console.log("server running at 65001");
});
