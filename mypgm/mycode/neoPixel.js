const ws281x = require('@bartando/rpi-ws281x-neopixel');
const NUM_LEDS = 12;

ws281x.init({count: NUM_LEDS, stripType: ws281x.WS2811_STRIP_GRB});
ws281x.setBrightness(100);

const waitTime = 3000;
var offset = 0;

const LEDon = (color, max) => {
  for(let i = 0; i < max; i++) {
    console.log("z");
    ws281x.setPixelColor(i, color);
    ws281x.show();
  }
}

process.on('SIGINT', () => {
  ws281x.reset();
  process.exit();
});

setInterval(() => {
  if(offset == 0) {
    LEDon({r: 255, g: 255, b: 255}, 12);
    offset = 1;
  }
  else if(offset == 1) {
      LEDon({r: 0, g: 0, b: 0}, 12);
      offset = 0;
    }
}, waitTime);
