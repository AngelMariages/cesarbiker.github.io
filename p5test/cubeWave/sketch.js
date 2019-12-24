/*jshint esversion: 6 */

let angle = 0;
let w = 24;
let ma;
let maxD;
let halfWidth, halfHeight;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	halfWidth = windowWidth / 2;
	halfHeight = windowHeight / 2;

	ma = atan(1 / sqrt(2));
	maxD = dist(0, 0, 200, 200);

	ortho(-windowWidth, windowWidth, windowHeight, -windowHeight, -3000, 3000);
}

function draw() {
	background(0);
	orbitControl();
	normalMaterial();

	rotateX(QUARTER_PI);
	rotateY(ma);

	for (let z = 0; z < width; z += w) {
		for (let x = 0; x < width; x += w) {
			push();

			let d = dist(x, z, halfWidth, halfWidth);

			let offset = map(d, 0, maxD, -3, 3);

			let a = angle + offset;
			let h = floor(map(sin(a), -1, 1, 100, 300));

			if (d < maxD / 10) {
				if (h == 100) {
					typeof navigator.vibrate === 'function' && navigator.vibrate(5);
				}
			}

			translate(x - halfWidth, 0, z - halfWidth);
			box(w - 2, h, w - 2);

			pop();
		}
	}
	if (angle >= 360) {
		angle = 0.05;
	}
	angle += 0.05;
}
