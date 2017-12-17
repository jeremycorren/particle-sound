/**
 * Main
 */

let canvas = document.getElementById('canvas');
let topBar = document.getElementById('top-bar');
let ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight - topBar.offsetHeight;

const idToColor = new Map();
const collisionPitches = getPitches(3, 5);
const chordPitches = getPitches(3, 4);

let atoms, shadows, specters;
function init() {
	let atomDensity, shadowDensity, specterDensity;
	if (ctx.canvas.width > 1200 && ctx.canvas.height > 700) {
		atomDensity = 35;
		shadowDensity = 28;
		specterDensity = 14;

		document.getElementById("warning").style.display = 'none';
	} else if (ctx.canvas.width > 800 && ctx.canvas.height > 500) {
		atomDensity = 25;
		shadowDensity = 23;
		specterDensity = 10;

		document.getElementById("warning").style.display = 'none';
	} else {
		atomDensity = 0;
		shadowDensity = 2;
		specterDensity = 1;

		document.getElementById("backdrop-button").style.display = 'none';
	}

	atoms = makeUnits(new UnitBuilder(TYPE.ATOM)
		.density(atomDensity)
		.minRadius(10)
		.maxRadius(17)
		.velocity(1.8)
		.opacity(0.6)
		.theme(atomTheme));

	shadows = makeUnits(new UnitBuilder(TYPE.UNIT)
		.density(shadowDensity)
		.minRadius(25)
		.maxRadius(35)
		.velocity(1.5)
		.opacity(0.15)
		.theme(shadowTheme));

	specters = makeUnits(new UnitBuilder(TYPE.UNIT)
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