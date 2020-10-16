const gpio = require("node-wiring-pi");
const BUZZER = 29;

const TurnOn = () => {
	gpio.digitalWrite(BUZZER, 1);
	console.log("buzzer on");
	setTimeout(TurnOff, 1000);
}

const TurnOff = () => {
	gpio.digitalWrite(BUZZER, 0);
	console.log("buzzer off");
	setTimeout(TurnOn, 1000);
}

process.on("SIGINT", () => {
	gpio.digitalWrite(BUZZER, 0);
	process.exit();
});

gpio.setup('wpi');
gpio.pinMode(BUZZER, gpio.OUTPUT);
setImmediate(TurnOn);
