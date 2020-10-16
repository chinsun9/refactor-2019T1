const gpio = require("node-wiring-pi");

const BLUE = 29;
const RED = 28;
const GREEN = 27;
const BUTTON = 26;
const BUZZER = 25;
const RELAY = 24;

var colorCount = 27;
var lightCount = 1;
var flag = 0;

const TurnOn = function() {
	gpio.softPwmWrite(RED, 0);
	gpio.softPwmWrite(GREEN, 0);
	gpio.softPwmWrite(BLUE, 0);

	if(colorCount == 30) {
		gpio.softPwmWrite(RED, lightCount);
		gpio.softPwmWrite(GREEN, lightCount);
		gpio.softPwmWrite(BLUE, lightCount);
	}
	else
		gpio.softPwmWrite(colorCount, lightCount);

	if(lightCount == 1) {
		lightCount = 25;
		gpio.digitalWrite(BUZZER, 1);
		gpio.delay(50);
		gpio.digitalWrite(BUZZER, 0);
	}
	else if(lightCount == 100) {
		lightCount = 1;
		colorCount = (colorCount != 30)? (colorCount+1): 27;
	}
	else
		lightCount = lightCount+25;

	console.log(lightCount + "  " + colorCount);

}

process.on('SIGINT', function() {
	gpio.softPwmWrite(RED, 0);
	gpio.softPwmWrite(GREEN, 0);
	gpio.softPwmWrite(BLUE, 0);
	gpio.digitalWrite(BUZZER, 0);
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(BUZZER, gpio.OUTPUT);
gpio.pinMode(BUTTON, gpio.INPUT);
gpio.softPwmCreate(RED, 0, 100);
gpio.softPwmCreate(BLUE, 0, 100);
gpio.softPwmCreate(GREEN, 0, 100);
gpio.wiringPiISR(BUTTON, gpio.INT_EDGE_FALLING, TurnOn);
