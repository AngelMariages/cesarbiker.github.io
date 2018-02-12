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
		this.visited = false;
	}

	show(current) {
		let x = this.i * this.w;
		let y = this.j * this.w;

		noStroke();
		fill(0, 0, 0, 0);
		rect(x, y, this.w, this.w);

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

		if (this.visited) {
			noStroke();
			fill(255, 0, 255, 125);
			rect(x, y, this.w, this.w);
		}
		if (current) {
			noStroke();
			fill(255, 0, 255, 255);
			rect(x, y, this.w, this.w);
		}
	}

	getNeighbors(grid, cols, rows) {
		this.neighbors = [];

		let top = grid[index(this.i, this.j - 1, cols, rows)];
		let right = grid[index(this.i + 1, this.j, cols, rows)];
		let bottom = grid[index(this.i, this.j + 1, cols, rows)];
		let left = grid[index(this.i - 1, this.j, cols, rows)];

		if (top && !top.visited) {
			this.neighbors.push(top);
		}
		if (right && !right.visited) {
			this.neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
			this.neighbors.push(bottom);
		}
		if (left && !left.visited) {
			this.neighbors.push(left);
		}

		return this.neighbors;
	}

	checkNeighbors(grid, cols, rows) {
		this.getNeighbors(grid, cols, rows);

		if (this.neighbors.length > 0) {
			let r = floor(random(0, this.neighbors.length));


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
