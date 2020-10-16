const gpio = require("node-wiring-pi");
const BUTTON = 25;
const BUZZER = 29;

const TurnOn = () => {
	let data = gpio.digitalRead(BUTTON);
	if(!data) {
		gpio.digitalWrite(BUZZER, 1);
	}
	else
		gpio.digitalWrite(BUZZER, 0);
	setTimeout(TurnOn, 100);
}

process.on('SIGINT', () => {
	gpio.digitalWrite(BUZZER, 0);
	process.exit();
});

gpio.setup('wpi');
gpio.pinMode(BUTTON, gpio.INPUT);
gpio.pinMode(BUZZER, gpio.OUTPUT);
setImmediate(TurnOn);
