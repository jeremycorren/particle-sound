/**
 * Particle system
 */

const mouseArea = 70;
const circleDensity = 100;
const minRadius = 7, maxRadius = 10;
const shrinkRadius = 7, growRadius = 15;
const colors = [
	'#050C42',
	'#0284A8',
	'#02BEC4',
	'#79A69D',
	'#E1F7E7'
]

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.15;

var mouse = {x: undefined, y: undefined, click: false}

function Circle(x, y, r, dx, dy) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.color = colors[randomFrom(colors.length)];

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	this.update = function() {
		if (this.x + this.r > canvas.width || this.x - this.r < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.r > canvas.height || this.y - this.r < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x - this.x < mouseArea 
				&& mouse.x - this.x > -mouseArea
				&& mouse.y - this.y < mouseArea 
				&& mouse.y - this.y > -mouseArea
				&& this.r < growRadius) {
			this.r += 2;
		} else if (this.r > shrinkRadius) {
			this.r -= 2;
		}

		if (mouse.click === true) {

		}

		this.draw();
	}
}

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('mouseclick', function(event) {
	mouse.click = true;
})

var circles = makeCircles(circleDensity);
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < circles.length; i++) {
		circles[i].draw();
		circles[i].update();
	}
}

function makeCircles(length) {
	circles = []
	for (var i = 0; i < length; i++) {
		circles[i] = makeCircle(randomBetween(minRadius, maxRadius));
	}
	return circles;
}

function makeCircle(r) {
	return new Circle(
		Math.random() * (canvas.width - 2*r) + r,
		Math.random() * (canvas.height - 2*r) + r,
		r,
		(Math.random() - 0.5) * 4,
		(Math.random() - 0.5) * 4
	);
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFrom(length) {
	return Math.floor(Math.random() * length);
}

animate();
