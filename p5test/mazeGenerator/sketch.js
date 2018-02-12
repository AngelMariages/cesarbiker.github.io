/*jshint esversion: 6 */

var cols, rows;
var w = 30;
var grid = [];
var current;
var stack = [];
var finished = false;
var start;

p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = floor(width / w);
    rows = floor(height / w);

    forAllIJ(rows, cols, (i, j) => {
        grid.push(new Cell(i, j, w));
    });

    current = grid[0];
    start = millis();
}

function draw() {
    background(51);

    forAllIJ(rows, cols, (i, j) => {
        grid[i + (j * cols)].show(current.i === i && current.j === j);
    });

    current.visited = true;
    var next = current.checkNeighbors(grid, cols, rows);
    if (next) {
        next.visited = true;
        Cell.removeWalls(current, next);

        if (current.getNeighbors(grid, cols, rows).length > 0) {
            stack.push(current);
        }

        current = next;
    } else if (stack.length > 0) {
        var tmp = stack.pop();
        if (tmp.getNeighbors(grid, cols, rows).length > 0) {
            current = tmp;
        }
    } else {
        finished = true;
        console.log("Finished in: " + (millis() - start));
    }
}

function forAllIJ(first, second, func) {
    for (var j = 0; j < first; j++) {
        for (var i = 0; i < second; i++) {
            func(i, j);
        }
    }
}