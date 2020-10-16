const gpio = require("node-wiring-pi");
const BUTTON = 25;
const BUZZER = 29;
const LED1 = 23;
const LED2 = 24;
var check = 0;

const TurnOn = () => {
	gpio.digitalWrite(LED1, 0);
	gpio.digitalWrite(LED2, 0);

	let data = gpio.digitalRead(BUTTON);
	if(!data) {
		check++;
		setTimeout(TurnOn, 100);
	}
	else {
		if(check >= 30 ) {
			gpio.digitalWrite(BUZZER, 1);
			setTimeout(TurnOnRed, 3000);
			check = 0;
		}
		else if(check > 0) {
			gpio.digitalWrite(LED1, 1);
			setTimeout(TurnOn, 500);
			check = 0;
		}
		else {
			setTimeout(TurnOn, 100);
		}
	}
}

const TurnOnRed = () => {
	gpio.digitalWrite(BUZZER, 0);
	gpio.digitalWrite(LED2, 1);
	setTimeout(TurnOn, 500);
}

process.on('SIGINT', () => {
	gpio.digitalWrite(BUZZER, 0);
	gpio.digitalWrite(LED1, 0);
	gpio.digitalWrite(LED2, 0);
	process.exit();
});

gpio.setup('wpi');
gpio.pinMode(BUTTON, gpio.INPUT);
gpio.pinMode(BUZZER, gpio.OUTPUT);
gpio.pinMode(LED1, gpio.OUTPUT);
gpio.pinMode(LED2, gpio.OUTPUT);
setImmediate(TurnOn);
