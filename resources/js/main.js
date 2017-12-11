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
	atoms = makeUnits(new UnitBuilder(TYPE.ATOM)
		.density(10)
		.minRadius(10)
		.maxRadius(17)
		.velocity(3)
		.opacity(0.5)
		.theme(atomTheme));

	shadows = makeUnits(new UnitBuilder(TYPE.SHADOW)
		.density(15)
		.minRadius(25)
		.maxRadius(35)
		.velocity(1.5)
		.opacity(0.15)
		.theme(shadowTheme));

	specters = makeUnits(new UnitBuilder(TYPE.SPECTER)
		.density(5)
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
	ripples.forEach(ripple => {
		ripple.update();
	});
}

init();
animate();