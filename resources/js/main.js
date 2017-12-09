/**
 * Main
 */

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

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
	atoms = makeUnits(new UnitsBuilder(TYPE.ATOM)
		.density(10)
		.minRadius(10)
		.maxRadius(17)
		.velocity(4)
		.opacity(0.5)
		.theme(atomTheme));

	shadows = makeUnits(new UnitsBuilder(TYPE.SHADOW)
		.density(10)
		.minRadius(25)
		.maxRadius(35)
		.velocity(1.5)
		.opacity(0.15)
		.theme(shadowTheme));

	specters = makeUnits(new UnitsBuilder(TYPE.SPECTER)
		.density(10)
		.minRadius(60)
		.maxRadius(100)
		.velocity(0.5)
		.opacity(0.15)
		.theme(specterTheme));
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	atoms.forEach(atom => {
		atom.update(atoms);
	});

	shadows.forEach(shadow => {
		shadow.update(shadows);
	});

	specters.forEach(specter => {
		specter.update(specters);
	});
}

init();
animate();
