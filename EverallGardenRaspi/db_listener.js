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
	'valveIds' : [1,2,3,4], // just local id's (nohing about pins). If have 4 valves, they will be called 1,2,3,4. Must corlate with DB and FrontEnd
	'constants':
	{
		MS_IN_MINUTE: 60000
	},
	'valveConfig': 
	{
		// vslves related data ;
		// main keys: valve id,
		// pin numbers === Gpio numbers for on/off states
		// TODO: keep in separate JSON file, or in DB, and initiate in init()
	
		1: {
			currentState: '0',
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
			currentState: '0',
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

		3: {
			currentState: 'NA',
			states: {
				on: {
					pins: {
						
					}
				},
				off: {
					pins: {
						
					}
				}
			},
		},

		4: {
			currentState: 'NA',
			states: {
				on: {
					pins: {
						
					}
				},
				off: {
					pins: {
						
					}
				}
			},
		}
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
	app.instructionsReference.off();
	app.instructionsReference.on('child_changed', function (snapshot) {app.valvesController.instructionDistatcher(snapshot)});
}

function setupValvesController (attr) {

	attr.instructionDistatcher = instructionDistatcher;
	
	return new ValvesController(attr);
		
	function instructionDistatcher (snapshot) {
		let instruction = snapshot.val();
		switch (instruction.type) {
			case '0':
				instructionType0(instruction);
				break;
			case '1':
				instructionType1(instruction);
				break;
			default :
				console.log('-W Unknown instruction type, ignoring : ', instruction.type);	
		} 
	}

	function instructionType0(instruction) {
		console.log('Got instruction of type 0 \n', instruction);
		//Instruction:
		// { creation_date: 'Wed, 29 May 2019 18:27:29 GMT',
		// 	data: {
		// 		duration: 300000 
		// 	},
  		// 	delay: 0,
  		// 	id: '-Lg3qChGo4YKswHxy4K-',
  		// 	start_date: 'Wed, 29 May 2019 18:27:29 GMT',
  		// 	type: '1',
  		// 	valveId: 'tap2',
  		// 	valve_new_state: '0' }
		// }	

		let mseconds = instruction.data.duration;
		let minutes = mseconds / app.constants.MS_IN_MINUTE; 
		let state = instruction.valve_new_state;
		let valveDbId = instruction.valveId;
		let valveHwId = instruction.valveHardwareId;
		
		switch(state) {
			case '0' :
				turnOff();
				break;
			case '1' :
				turnOn();
				break;
			default:
				console.log('-W- Invalid state, ignoring : ', state); 		
		}

		function turnOff() {
			console.log('\n\n Turning off the valve :');

			console.log('1. update Gpio (i.e. physically turn-off the valve');
			console.log('2. Update valve fields in the DB : state, lastOperationDate');
			console.log('3. Write statistics (need elaborate fromat)');

			console.log('\nValve number', valveHwId, 'turned off!');
		}
		
		function turnOn () {
			console.log('Turning on...');
		}

	}

	function instructionType1(instruction) {
		console.log('Got instruction of type 1. It is still under implementation. Stay tuned. \n', instruction);
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