/* eslint-disable max-depth */
/* eslint-disable no-undef */
/*jshint esversion: 6 */

let cols,
	rows;
const w = 30;
const grid = [];
const stack = [];
let finished = false;
let current;

p5.disableFriendlyErrors = true;

const forAllIJ = (first, second, func) => {
	for (let j = 0; j < first; j++) {
		for (let i = 0; i < second; i++) {
			func(i, j);
		}
	}
};

// eslint-disable-next-line no-unused-vars
function setup() {
	createCanvas(windowWidth, windowHeight);
	cols = floor(width / w);
	rows = floor(height / w);

	forAllIJ(rows, cols, (i, j) => {
		grid.push(new Cell(i, j, w));
	});

	//current =grid[0];
	totalCells = grid.length;
}

const drawAll = (i, j) => {
	const isCurrent = current && (current.i === i && current.j === j);

	grid[i + (j * cols)].show(isCurrent);
};

const getPointingCell = () => {
	let i = Math.floor(mouseX / w);
	let j = Math.floor(mouseY / w);

	return { i, j };
};



// eslint-disable-next-line no-unused-vars
function draw() {
	background(51);

	if (!current) {
		const pointing = getPointingCell();

		if (mouseIsPressed) {
			current = grid[pointing.i + (pointing.j * cols)];
		} else {
			grid[pointing.i + (pointing.j * cols)].show(true);
		}
	} else {
		current.visited = true;
		//current.hue = (125 * order) / totalCells;

		//order = order += 1;

		const next = current.checkNeighbors(grid, cols, rows);

		if (next) {
			Cell.removeWalls(current, next);

			if (current.getNeighbors(grid, cols, rows).length > 0) {
				stack.push(current);
			}

			current = next;
		} else if (stack.length > 0) {
			let tmp = stack.pop();

			while (!!tmp && tmp.getNeighbors(grid, cols, rows).length === 0) {
				tmp = stack.pop();
			}

			current = tmp;
		}
	}

	forAllIJ(rows, cols, drawAll);
}

/*

		current.visited = true;
		current.hue = (125 * order) / totalCells;

		order = order += 1;

		const next = current.checkNeighbors(grid, cols, rows);

		if (next) {
			Cell.removeWalls(current, next);

			if (current.getNeighbors(grid, cols, rows).length > 0) {
				stack.push(current);
			}

			current = next;
		} else if (stack.length > 0) {
			let tmp = stack.pop();

			while (!!tmp && tmp.getNeighbors(grid, cols, rows).length === 0) {
				tmp = stack.pop();
			}

			if (!tmp) {
				finished = true;
				//console.log('Finished in: ' + (millis() - start));
			} else {
				current = tmp;
			}
		}

*/
