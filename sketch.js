//Ben Lamb O'Sullivan - hi@benlambosullivan.com
//Frequency Analysis with FFT Graphic EQ based on
//The Coding Train video 17.11 17.11: Sound Visualization:
//Frequency Analysis with FFT - p5.js Sound Tutorial
//https://www.youtube.com/watch?v=2O3nm0Nvbi4&t=195s
//==================================================

let song;
let fft;
let button;
let canvas;

let numFreqBands = 256;
let w;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('DrumsInfront.mp3');
}

function setup() {
  canvas = createCanvas(600, 400);
  angleMode(DEGREES);
  button = createButton('stop/reset');
  button.mousePressed(toggleSong);
  song.play();
  //FFT([smoothing], [bins]); https://p5js.org/reference/#/p5.FFT
  //smoothing = interpoling values to give average, bins = num of freq bands
  //will divide audio freq spectrum into 256 bands
  fft = new p5.FFT(0.9, numFreqBands);
  //width of freq band
  w = width / numFreqBands;
  // let songDur = song.duration;
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  noStroke();
  colorMode(HSB);
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 255, height, 0);
    fill(i, 255, 255);
    rect(i * w, y, w - 2, height - y);
  }
  //will print number of freq bands
  // console.log(spectrum.length);

}

// function mouseClicked() {
//   saveCanvas('radial-image', 'png');
// }