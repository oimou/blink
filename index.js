const five = require("johnny-five");
const raf = require("raf");

let myBoard, myLed;

myBoard = new five.Board();

myBoard.on("ready", function() {

  myLed = new five.Led(11);

  // frequency [Hz]
  const f = 10;

  // omega [rad/ms]
  const omega = 2 * Math.PI * f * Math.pow(10, -3);;

  // amplitude
  const A = 255 / 2;

  // offset
  const offset = 255 / 2;

  // formula
  const func = (t) => {
    return A * Math.sin(omega * t) + offset;
  };

  raf(function tick() {
    // time [ms]
    const t = new Date().getTime();

    // formula
    const y = func(t);

    myLed.brightness(y);

    raf(tick);
  });

  // make myLED available as "led" in REPL

  this.repl.inject({
    led: myLed
  });

  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});
