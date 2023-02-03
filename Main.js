import Sokoban from "./Sokoban";

var canvas = document.getElementById("canvas");
canvas.width = 480;
canvas.height = 480;
canvas.style.border = "1px solid black";
window.AudioContext = window.AudioContext||window.webkitAudioContext;

var ctx = canvas.getContext("2d");

window.pressedKeys = {};
addEventListener("keydown", (e) => {
  window.pressedKeys[e.keyCode] = true;
}, false);
addEventListener("keyup", (e) => {
  delete window.pressedKeys[e.keyCode];
}, false);

function loadImage(fileName) {
  return new Promise((resolve, reject) => {
    var img = new Image();

    img.onload = (e) => { resolve(img); }
    img.onerror = (e) => { throw(e); }

    img.src = fileName;
  });
}

loadImage("./Assets/Goal.png").then((img) => {
  window.sprites["Goal"] = img;
});
loadImage("./Assets/Fertiliser.png").then((img) => {
  window.sprites["Fertiliser"] = img;
});
loadImage("./Assets/Soil.png").then((img) => {
  window.sprites["Soil"] = img;
});
loadImage("./Assets/Wall.png").then((img) => {
  window.sprites["Wall"] = img;
});

/**
 * Main game loop
 */
function updateGame() {
  var now = Date.now();
  var delta = now - prevTime;

  update(delta / 1000);
  render();

  prevTime = now;
}

window.setInterval((updateGame), 1000 / 60);