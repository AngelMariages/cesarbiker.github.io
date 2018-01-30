/*jshint esversion: 6 */

let stars = new Array(1000);

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
        this.x = random(-width * 2, width * 2);
        this.y = random(-height * 4, height * 4);
        this.z = random(width);
        this.pz = this.z;
        this.minus = 2;
        this.lineLength = 5;
    }

    update() {
        if(mouseIsPressed) {
            if(this.minus < 200) {
                this.minus = this.minus * 1.1;
                if(this.minus > 120) {
                    this.blue = true;
                }
            }
            this.z -= this.minus;
        } else {
            this.blue = false;
            this.z -= this.minus;
            if(this.minus > 2) {
                this.minus = this.minus / 1.1;
            }
        }
        if(this.z < 1) {
            this.x = random(-width * 2, width * 2);
            this.y = random(-height * 4, height * 4);
            this.z = width;
            this.pz = 0;
        }
    }

    show() {
        let sx = map(this.x / this.z, 0, this.lineLength, 0, width);
        let sy = map(this.y / this.z, 0, this.lineLength, 0, height);

        let px = map(this.x / this.pz, 0, this.lineLength, 0, width);
        let py = map(this.y / this.pz, 0, this.lineLength, 0, height);

        stroke(255);
        if(this.blue) {
            stroke(92, 214, 230);
        }
        line(px, py, sx, sy);
        this.pz = this.z;
    }
}