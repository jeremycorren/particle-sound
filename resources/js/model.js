/**
 * Model
 */

class Circle {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}
}

class Ripple extends Circle {
	constructor(x, y, r) {
		super(x, y, r);
		this.color = 'rgba(255, 255, 255, ';
		this.opacity = 0.7;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.strokeStyle = this.color + this.opacity + ')';
		ctx.stroke();
	}

	update() {
		this.r += 1;
		this.opacity -= 0.005;
		this.draw();
	}
}

function makeRipple(x, y, r) {
	ripples.push(new Ripple(x, y, r));
	if (ripples.length > 15) {
		ripples.shift();
	}
}

class Unit extends Circle {
	constructor(x, y, r, velocity, opacity, theme) {
		super(x, y, r);
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

class Atom extends Unit {
	constructor(x, y, r, velocity, opacity, theme, id) {
		super(x, y, r, velocity, opacity, theme);
		this.mass = 1;
		this.id = id;
		this.volume = new Tone.Volume(-20);
		this.env = new Tone.AmplitudeEnvelope({
			"attack": 0.05,
			"decay": 0.3,
			"sustain": 1,
			"release": 10
		}).chain(this.volume, Tone.Master);
		this.osc = new Tone.OmniOscillator().connect(this.env);
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

		if (idToColor.has(this.id)) {
			let rVal = valueOf(idToColor.get(this.id));

			if (rVal > 10) {
				rVal -= 1;
			}
			ctx.fillStyle = stringOf(rVal);
			idToColor.set(this.id, stringOf(rVal));
		} else {
			ctx.fillStyle = this.color;
		}
		ctx.fill();
	}

	update(units) {
		for (let i = 0; i < units.length; i++) {
			if (this === units[i]) {
				continue;
			} else if (hasCollided(this, units[i])) {
				idToColor.set(this.id, stringOf(235));

				this.osc.frequency.value = collisionPitches[randomFrom(collisionPitches)];
				this.osc.start();
				this.env.triggerAttackRelease(0.8);

				makeRipple(this.x, this.y, this.r);
				resolveCollision(this, units[i]);
			}
		}

		super.update();
	}
}

class UnitBuilder {
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