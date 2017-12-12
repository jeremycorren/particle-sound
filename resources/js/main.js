/**
 * Main
 */

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let mouse = {
	x: undefined, 
	y: undefined
};

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

let atoms, shadows, specters;
function init() {
	let atomDensity, shadowDensity, specterDensity;
	if (ctx.canvas.width < 1300 && ctx.canvas.height < 700) {
		atomDensity = 25;
		shadowDensity = 20;
		specterDensity = 8;
	} else {
		atomDensity = 50;
		shadowDensity = 35;
		specterDensity = 10;
	}

	atoms = makeUnits(new UnitBuilder(TYPE.ATOM)
		.density(atomDensity)
		.minRadius(10)
		.maxRadius(17)
		.velocity(1.8)
		.opacity(0.6)
		.theme(atomTheme));

	shadows = makeUnits(new UnitBuilder(TYPE.SHADOW)
		.density(shadowDensity)
		.minRadius(25)
		.maxRadius(35)
		.velocity(1.5)
		.opacity(0.15)
		.theme(shadowTheme));

	specters = makeUnits(new UnitBuilder(TYPE.SPECTER)
		.density(specterDensity)
		.minRadius(60)
		.maxRadius(100)
		.velocity(0.5)
		.opacity(0.15)
		.theme(specterTheme));
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < atoms.length; i++) {
		atoms[i].update(atoms);
	}
	shadows.forEach(shadow => shadow.update());
	specters.forEach(specter => specter.update());
	ripples.forEach(ripple => ripple.update());
}

init();
animate();