import Sokoban from "./Sokoban.js";

var canvas = document.getElementById("canvas");
canvas.width = 64*8;
canvas.height = 64*8;
canvas.style.border = "1px solid black";
window.AudioContext = window.AudioContext||window.webkitAudioContext;

var ctx = canvas.getContext("2d");
var game = new Sokoban(ctx);

window.pressedKeys = {};
addEventListener("keydown", (e) => {
  if (!(e.keyCode in window.pressedKeys))
    window.pressedKeys[e.keyCode] = 0;
}, false);
addEventListener("keyup", (e) => {
  delete window.pressedKeys[e.keyCode];
}, false);

window.sprites = {};
function loadImage(fileName) {
  return new Promise((resolve, reject) => {
    var img = new Image();

    img.onload = (e) => { resolve(img); }
    img.onerror = (e) => { throw(e); }

    img.src = fileName;
  });
}

window.sounds = {};
function loadAudio(fileName) {
  return new Promise((resolve, reject) => {
    var snd = new Audio();

    snd.onloadeddata = (e) => { 
      resolve(snd);
    }
    snd.onerror = (e) => { throw(e); }

    snd.src = fileName;
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
loadImage("./Assets/Player.png").then((img) => {
  window.sprites["Player"] = img;
});
loadImage("./Assets/Concrete.png").then((img) => {
  window.sprites["Concrete"] = img;
});

loadAudio("./Assets/Bump.wav").then((snd) => {
  window.sounds["Bump"] = snd;
});
loadAudio("./Assets/Grow.wav").then((snd) => {
  window.sounds["Grow"] = snd;
});
loadAudio("./Assets/Shrink.wav").then((snd) => {
  window.sounds["Shrink"] = snd;
});
loadAudio("./Assets/LevelComplete.wav").then((snd) => {
  window.sounds["LevelComplete"] = snd;
});
loadAudio("./Assets/Reroot.wav").then((snd) => {
  window.sounds["Reroot"] = snd;
});
loadAudio("./Assets/Fertilised.wav").then((snd) => {
  window.sounds["Fertilised"] = snd;
});


var prevTime = Date.now();

/**
 * Main game loop
 */
function updateGame() {
  var now = Date.now();
  var delta = now - prevTime;

  game.update(delta / 1000);
  game.render();

  for (const i of Object.keys(window.pressedKeys)) {
    window.pressedKeys[i]++;
  }

  prevTime = now;
}

window.setInterval((updateGame), 1000 / 60);