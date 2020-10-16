const gpio = require("node-wiring-pi");
const BUTTON = 25;
let flag = 0;

const CheckButton = () => {
	let data = gpio.digitalRead(BUTTON);
	if(!data && flag == 0) {
		console.log("CheckButton!");
		flag = 1;
	}
	else if(data && flag == 1)
		flag = 0
	setTimeout(CheckButton, 100);
}

process.on("SIGINT", () => {
	console.log("시스템을 종료합니다");
	process.exit();
});

gpio.setup("wpi");
gpio.pinMode(BUTTON, gpio.INPUT);
setImmediate(CheckButton);
