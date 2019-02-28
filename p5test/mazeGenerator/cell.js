/*jshint esversion: 6 */

function index(i, j, cols, rows) {
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}

	return i + (j * cols);
}

class Cell {
	constructor(i, j, w) {
		this.i = i;
		this.j = j;
		this.w = w;
		this.walls = {
			top: true,
			right: true,
			bottom: true,
			left: true
		};
		this.hue = 255;
		this.visited = false;
	}

	show(current) {
		colorMode(HSB);

		let x = this.i * this.w;
		let y = this.j * this.w;

		noStroke();
		fill(0, 0, 0, 0);
		rect(x, y, this.w, this.w);

		if (this.visited) {
			noStroke();
			fill(this.hue, 255, 255);
			rect(x, y, this.w, this.w);
		}

		if (current) {
			noStroke();
			fill(255, 0, 255, 255);
			rect(x, y, this.w, this.w);
		}

		stroke(255);
		if (this.walls.top) {
			line(x, y, x + w, y);
		}
		if (this.walls.right) {
			line(x + w, y, x + w, y + w);
		}
		if (this.walls.bottom) {
			line(x + w, y + w, x, y + w);
		}
		if (this.walls.left) {
			line(x, y + w, x, y);
		}
		noStroke();
	}

	getNeighbors(grid, cols, rows) {
		this.neighbors = [];

		const top = grid[index(this.i, this.j - 1, cols, rows)];
		const right = grid[index(this.i + 1, this.j, cols, rows)];
		const bottom = grid[index(this.i, this.j + 1, cols, rows)];
		const left = grid[index(this.i - 1, this.j, cols, rows)];

		if (top && !top.visited) {
			top.is = 'top';
			this.neighbors.push(top);
		}
		if (right && !right.visited) {
			right.is = 'right';
			this.neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
			bottom.is = 'bottom';
			this.neighbors.push(bottom);
		}
		if (left && !left.visited) {
			left.is = 'left';
			this.neighbors.push(left);
		}

		return this.neighbors;
	}

	checkNeighbors(grid, cols, rows) {
		this.getNeighbors(grid, cols, rows);

		if (this.neighbors.length > 0) {
			const r = floor(random(0, this.neighbors.length));


			return this.neighbors[r];
		}

		return undefined;
	}

	static removeWalls(a, b) {
		let x = a.i - b.i;

		if (x === 1) {
			a.walls.left = false;
			b.walls.right = false;
		} else if (x === -1) {
			b.walls.left = false;
			a.walls.right = false;
		}

		let y = a.j - b.j;

		if (y === 1) {
			a.walls.top = false;
			b.walls.bottom = false;
		} else if (y === -1) {
			b.walls.top = false;
			a.walls.bottom = false;
		}
	}
}
