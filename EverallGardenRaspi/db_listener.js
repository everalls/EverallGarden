//Testing in PC - no real valves connection
var pc_test = process.env.PC_TEST;
if (pc_test) {
	console.log('-W-  Running in PC_TEST mode. all hardware pis operations will be skipped\n-W- To control: set/unset env variable PC_TEST. Set to some value to enable');
} 

// Initialize Firebase
// Get the values for speific project at the firebase console 
var firebaseConfig = {
	apiKey: "AIzaSyAAmIf2LvOMvJwXHZN9pCJ3UlUClyx0zAE",
	authDomain: "paspinode.firebaseapp.com",
	databaseURL: "https://paspinode.firebaseio.com",
	projectId: "paspinode",
	storageBucket: "paspinode.appspot.com",
	messagingSenderId: "226347946845"
};

var app = {
	'firebase': null,
	'database': null,
	'valvesReferencePath': 'taps',
	'instructionsReferencePath': 'instructions',
	'valvesReferense': null,
	'instructionsReference': null,
	'pinNumbers': [4, 17, 27, 18, 23, 24], // all relevant hardware IO pin numbers (as in prspi)
	'gpio': null, // will be defined by required package
	'valvesController': null,
	'valveIds' : [1,2], // just local id's (nohing about pins). If have 4 valves, they will be called 1,2,3,4
	'valveConfig': 
	{
		// class describes possible states of the valves;
		// main keys: valve id,
		// pin numbers === Gpio numbers
		// TODO: keep in separate JSON file, or in DB, and initiate in init()
	
		1: {
			currentState: 'off',
			states: {
				on: {
					pins: {
						4: 1,  // to enable
						17: 1,
						27: 0
					}
				},
				off: {
					pins: {
						4: 1,
						17: 0,
						27: 1
					}
				}
			},
		},
		2: {
			currentState: 'off',
			states: {
				on: {
					pins: {
						18: 1,  // to enable
						23: 1,
						24: 0
					}
				},
				off: {
					pins: {
						18: 1,
						23: 0,
						24: 1
					}
				}
			},
		},
	}
} // of app object

function init() {
	//TODO messaging and logging mehanism
	console.log('-I- Start DB and software initilization... ');
	app.firebase = require("firebase");
	app.firebase.initializeApp(firebaseConfig);
	app.database = app.firebase.database();
	app.valvesReferense = app.database.ref(app.valvesReferencePath);
	app.valvesReferense.off(); // disalble possible old listeners
	app.instructionsReference = app.database.ref(app.instructionsReferencePath);
	app.instructionsReference.off();
	if(pc_test) {
		console.log('-W- PC_TEST mode. Gpio initialization skipped')
		
	} else {
		app.gpio = require('onoff').Gpio;
	}
	console.log('-I- Done');
	console.log('-I- Start hardware initialization')
	initValves();
	console.log('-I- Done')
	console.log('-I- Setup DB-listener ')
	initDbListener ();
	console.log('-I- Done.');
}

function initValves() {
	var options = {
		'pc_test': pc_test
	}
	app.valvesController = setupValvesController(
			{
				'pinNumbers': app.pinNumbers, 
				'valveIds': app.valveIds, 
				'valveConfig': app.valveConfig, 
				'gpio': app.gpio,
				'options': options
			}
		);
}

function initDbListener () {
	app.instructionsReference.on('child_changed', function (data) {app.valvesController.instructionDistatcher(data)});

	// app.valvesReferense.on('value', function (snapshot) {
	// 	var valveState = {};
	// 	snapshot.forEach(function (childSnapshot) {	
	// 		valveState[childSnapshot.val().id] = childSnapshot.val().state;
	// 	});
	// 	app.valvesController.updateValveState(valveState);
	// 	app.valvesController.valvesOnOffByState();
	// });
	//app.valvesController.instructionDistatcher('Test instruction');
}

function setupValvesController (attr) {

	attr.instructionDistatcher = instructionDistatcher;
	attr.instructionType0 = instructionType0;
	
	return new ValvesController(attr);
		
	function instructionDistatcher (instruction) {
		console.log('Got new instruction', instruction.val());
	}

	function instructionType0 (instruction) {
		console.log('Got instruction of type 0');
	}	
}
//////////////// Constructor ///////////////////////////
function ValvesController (attr) {
	
    var pinNumbers = attr.pinNumbers; 
	var valveIds = attr.valveIds;
	var valveConfig = attr.valveConfig;
	var gpio = attr.Gpio;
	var pc_test = attr.options.pc_test;

	this.instructionDistatcher = attr.instructionDistatcher;
	
	attr = null;

	// Set all needed gpio pins
	var allPins = {}; // will be set pinNumber -> gpio pin object		
	if(pc_test) {
		console.log('-W- Running in PC_TEST mode. Skip gpio pins settingss')
	} else {
		for (var i = 0, pin; pin = pinNumbers[i]; i++) {
			allPins[pin] = new gpio(pin, 'out');
			allPins[pin].writeSync(0);
		}
	}

	function valveOnOff(valve, state) {
		var valvePins = valveConfig[valve].states[state].pins;
		for (pin in valvePins) {
			allPins[pin].writeSync(valvePins[pin]);
		}
	}
}

init();