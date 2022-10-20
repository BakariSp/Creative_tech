let sound, amplitude;

function preload(){
  sound = loadSound('assets/Pantheon.wav');
}
function setup() {
  let cnv = createCanvas(100,100);
  cnv.mouseClicked(togglePlay);
  amplitude = new p5.Amplitude();
}

function draw() {
  background(220);
  text('tap to play', 20, 20);

  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 200);
  ellipse(width/2, height/2, size, size);
}

function togglePlay() {
  if (sound.isPlaying() ){
    sound.pause();
  } else {
    sound.loop();
		amplitude = new p5.Amplitude();
		amplitude.setInput(sound);
  }
}