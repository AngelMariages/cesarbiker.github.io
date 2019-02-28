/*jshint esversion: 6 */
let mySound;

function preload() {
	mySound = loadSound('bass.wav');
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	fft = new p5.FFT();
	mySound.loop();
}

function draw() {
	background(0);
	var waveform = fft.waveform();
	noStroke();
	noFill();
	beginShape();
	stroke(255, 0, 0);
	strokeWeight(1);
	for (var i = 0; i < waveform.length; i++) {
		var x = map(i, 0, waveform.length, 0, width);
		var y = map(waveform[i], -1, 1, 0, height);
		vertex(x, y);
	}
	endShape();
}
