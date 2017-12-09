/**
 * Model
 */

const TYPE = {
	ATOM: 0,
	SHADOW: 1,
	SPECTER: 2
}

const atomTheme = [
	'rgb(2, 84, 125', 
	'rgb(2, 132, 168', 
	'rgb(2, 190, 196'
];

const shadowTheme = [
	'rgb(96, 54, 128',
	'rgb(129, 86, 232',
	'rgb(108, 108, 255',
	'rgb(86, 122, 232'
]

const specterTheme = [
	'rgb(26, 31, 62',
	'rgb(69, 105, 142',
	'rgb(214, 227, 242'
]

const mouseArea = 70;
const growRadius = 50;
const shrinkRadius = 30;
const resizeVelocity = 2;

class Unit {
	constructor(x, y, r, velocity, opacity, theme) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.velocity = {
			x: randomDelta(velocity),
			y: randomDelta(velocity)
		};
		this.color = randomColor(theme, opacity);
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	update() {
		if (touchesBorder(this.x, this.r, canvas.width)) {
			this.velocity.x = -this.velocity.x;
		}

		if (touchesBorder(this.y, this.r, canvas.height)) {
			this.velocity.y = -this.velocity.y;
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		this.draw();
	}
}

class Shadow extends Unit {
	constructor(x, y, r, velocity, opacity, theme) {
		super(x, y, r, velocity, opacity, theme);
	}

	update() {
		if (touchesBorder(this.x, this.r, canvas.width)) {
			this.velocity.x = -this.velocity.x;
		}

		if (touchesBorder(this.y, this.r, canvas.height)) {
			this.velocity.y = -this.velocity.y;
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		if (mouseInRange(mouse, mouseArea, this, growRadius)) {
			this.r += resizeVelocity;
		} else if (this.r > shrinkRadius) {
			this.r -= resizeVelocity;
		}

		this.draw();
	}
}

class Atom extends Unit {
	constructor(x, y, r, velocity, opacity, theme) {
		super(x, y, r, velocity, opacity, theme);
		this.mass = 1;
	}

	update(units) {
		for (let i = 0; i < units.length; i++) {
			if (this === units[i]) {
				continue;
			} else if (hasCollided(this, units[i])) {
				resolveCollision(this, units[i]);
			}
		}

		if (touchesBorder(this.x, this.r, canvas.width)) {
			this.velocity.x = -this.velocity.x;
		}

		if (touchesBorder(this.y, this.r, canvas.height)) {
			this.velocity.y = -this.velocity.y;
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		this.draw();
	}
}

class UnitsBuilder {
	constructor(type) {
		this.type = type;
	}

	density(density) {
		this.density = density;
		return this;
	}

	minRadius(minRadius) {
		this.minRadius = minRadius;
		return this;
	}

	maxRadius(maxRadius) {
		this.maxRadius = maxRadius;
		return this;
	}

	velocity(velocity) {
		this.velocity = velocity;
		return this;
	}

	opacity(opacity) {
		this.opacity = opacity;
		return this;
	}

	theme(theme) {
		this.theme = theme;
		return this;
	}
}