/*jshint esversion: 6 */

let stars = new Array(500);

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < stars.length; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    background(0);
    translate(mouseX, mouseY);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
}

class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z;
        this.lineLength = random(0, 15);
    }

    update() {
        this.z -= 6;
        if(this.z < 1) {
            this.z = width;
            this.pz = width;
        }
    }

    show() {
        let sx = map(this.x / this.z, 0, this.lineLength, 0, width);
        let sy = map(this.y / this.z, 0, this.lineLength, 0, height);

        let px = map(this.x / this.pz, 0, this.lineLength, 0, width);
        let py = map(this.y / this.pz, 0, this.lineLength, 0, height);

        stroke(255);
        line(px, py, sx, sy);
        this.pz = this.z;
    }
}