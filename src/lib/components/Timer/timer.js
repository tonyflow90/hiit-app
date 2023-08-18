let time = 0;
let isRunning = false;
let isPaused = false;
let timer = undefined;

const tick = 1000;

const run = () => {
  if (isRunning && !isPaused) time++;
  update();
};

function update() {
  let data = {
    time: time,
    isRunning: isRunning,
    isPaused: isPaused,
  };
  postMessage(data);
}

//Listen for events being sent to this web worker from app.js
self.onmessage = function (event) {
  let action = event.data;

  switch (action) {
    case "start":
      isRunning = true;
      time = 0;
      timer = this.setInterval(run, tick);
      break;
    case "pause":
      isPaused = true;
      break;
    case "resume":
      isPaused = false;
      break;
    case "reset":
      clearInterval(timer);
      time = 0;
      isRunning = false;
      isPaused = false;
      break;
    case "stop":
      clearInterval(timer);
      isRunning = false;
      isPaused = false;
      break;
    default:
      break;
  }
  update();
};
