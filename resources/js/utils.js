/**
 * Utils
 */

function makeUnits(unit) {
	units = []
	for (let i = 0; i < unit.density; i++) {
		let r = randomBetween(unit.minRadius, unit.maxRadius);
		let rSquared = r * 2;
		let x = randomBetween(canvas.width, rSquared);
		let y = randomBetween(canvas.height, rSquared)
		
		if (i > 0) {
			for (let j = 0; j < units.length; j++) {
				if (distanceBetween(x, y, units[j].x, units[j].y) - rSquared < 0) {
					x = randomBetween(canvas.width, rSquared);
					y = randomBetween(canvas.height, rSquared);

					j = -1;
				}
			}
		}

		if (unit.type === TYPE.ATOM) {
			units.push(new Atom(x, y, r, unit.velocity, unit.opacity, unit.theme, i));
		} else if (unit.type === TYPE.SHADOW) {
			units.push(new Shadow(x, y, r, unit.velocity, unit.opacity, unit.theme));
		} else if (unit.type === TYPE.SPECTER) {
			units.push(new Unit(x, y, r, unit.velocity, unit.opacity, unit.theme));
		}
	}
	return units;
}

function getPitches() {
	const pitchClasses = ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'];
	
	let pitches = [];
	for (let i = 3; i <= 5; i++) {
		pitchClasses.forEach(pitchClass => pitches.push(pitchClass + i));
	}
	return pitches;
}

function randomDelta(factor) {
	return (Math.random() - 0.5) * factor;
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFrom(array) {
	return Math.floor(Math.random() * array.length);
}

function randomColor(colors, opacity) {
	return colors[Math.floor(Math.random() * colors.length)] + ', ' + opacity + ')';
}

function stringOf(val) {
	return 'rgb(' + val + ' , 130, 220, 0.7';
}

function valueOf(string) {
	return parseInt(string.slice(4, 7));
}

function touchesBorder(axis, r, measure) {
	return axis + r > measure || axis - r < 0;
}

function mouseInRange(mouse, mouseArea, unit, growRadius) {
	return mouse.x - unit.x < mouseArea && mouse.x - unit.x > -mouseArea
		&& mouse.y - unit.y < mouseArea && mouse.y - unit.y > -mouseArea
		&& unit.r < growRadius;
}

function hasCollided(unit1, unit2) {
	return distanceBetween(unit1.x, unit1.y, unit2.x, unit2.y) - 2*unit1.r < 0;
}

function distanceBetween(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function resolveCollision(unit1, unit2) {
    const xVelocityDiff = unit1.velocity.x - unit2.velocity.x;
    const yVelocityDiff = unit1.velocity.y - unit2.velocity.y;

    const xDist = unit2.x - unit1.x;
    const yDist = unit2.y - unit1.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(unit2.y - unit1.y, unit2.x - unit1.x);

        const m1 = unit1.mass;
        const m2 = unit2.mass;

        const u1 = rotate(unit1.velocity, angle);
        const u2 = rotate(unit2.velocity, angle);

        const v1 = { 
        	x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), 
        	y: u1.y 
        };
        const v2 = { 
        	x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), 
        	y: u2.y 
        };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        unit1.velocity.x = vFinal1.x;
        unit1.velocity.y = vFinal1.y;

        unit2.velocity.x = vFinal2.x;
        unit2.velocity.y = vFinal2.y;
    }
}

function rotate(velocity, angle) {
    return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}