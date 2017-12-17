/**
 * Data
 */

const TYPE = {
	ATOM: 0,
	UNIT: 1
}

const atomTheme = [
	'rgba(10, 130, 220'
];

const shadowTheme = [
	'rgba(96, 54, 128',
	'rgba(129, 86, 232',
	'rgba(108, 108, 255',
	'rgba(86, 122, 232'
]

const specterTheme = [
	'rgba(26, 31, 62',
	'rgba(69, 105, 142',
	'rgba(214, 227, 242'
]

const backgroundColors = [
	'#000000',
	'#d2d4db',
	'#492d51',
	'#003b36',
	'#61598f',
	'#7d241d',
	'#3c2f35',
	'#021a42',
]

let ripples = [];

let polySynth = new Tone.PolySynth(6, Tone.MonoSynth).chain(
	new Tone.Volume(-36),
	new Tone.AutoFilter(),
	Tone.Master
).set({
	"envelope" : {
		"attack" : 6,
		"decay": 15,
		"sustain": 0,
		"release": 12
	}
});