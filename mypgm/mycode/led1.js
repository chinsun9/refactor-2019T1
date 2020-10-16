const gpio = require("node-wiring-pi");
const BLUE = 29;
const RED = 28;
const GREEN = 27;

var count = 0;

const TurnOn = () => {
	if(count == 0){ 
	gpio.digitalWrite(BLUE, 0);
	gpio.digitalWrite(RED, 0);
	gpio.digitalWrite(GREEN, 0);
	count = 1;
	}
	else if(count = 1) {
		gpio.digitalWrite(GREEN, 1);
		gpio.digitalWrite(BLUE, 1);
		gpio.digitalWrite(RED, 1);
		count = 0;
	}

	setTimeout(TurnOn, 30);
}

process.on('SIGINT', () => {
	gpio.digitalWrite(BLUE, 0);
	gpio.digitalWrite(RED, 0);
	gpio.digitalWrite(GREEN, 0);

	process.exit();
})

gpio.setup('wpi');
gpio.pinMode(BLUE, gpio.OUTPUT);
gpio.pinMode(RED, gpio.OUTPUT);
gpio.pinMode(GREEN, gpio.OUTPUT);
TurnOn();
