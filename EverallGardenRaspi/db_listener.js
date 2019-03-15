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
	'valvesReferense': null,
	'pinNumbers': [4, 17, 27, 18, 23, 24], // all relevant hardware IO pin numbers (as in prspi)
	'Gpio': null, // will be defined by required package
	'valvesController': null,
	'valveIds' : [1,2], // just local id's (nohing about pins). If have 4 valves, they will be called 1,2,3,4
	'valveConfig': 
	{
		// class describes states of the valves;
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
} // of app


function init() {
	//TODO messaging and logging mehanism
	console.log('-I- Start DB and software initilization... ');
	app.firebase = require("firebase");
	app.firebase.initializeApp(firebaseConfig);
	app.database = app.firebase.database();
	app.valvesReferense = app.database.ref(app.valvesReferencePath);
	app.valvesReferense.off(); // disalble possible old listeners
	app.Gpio = require('onoff').Gpio;
	console.log('-I- Done');
	console.log('-I- Start hardware initialization')
	initValves();
	console.log('-I- Setup DB-listener ')
	console.log('-I- Start hardware initialization')
	initDbListener ();
	console.log('-I- Done.');

}


function initValves() {
	app.valvesController = setupValvesController(app.pinNumbers, app.valveIds, app.valveConfig, app.Gpio);
}


function initDbListener () {
	app.valvesReferense.on('value', function (snapshot) {
		
		var valveState = {};

		snapshot.forEach(function (childSnapshot) {	
			valveState[childSnapshot.val().id] = childSnapshot.val().state;
		});

		app.valvesController.updateValveState(valveState);
		app.valvesController.valvesOnOffByState();
	});
}


function setupValvesController (_pinNumbers, _valveIds, _valveConfig, _gpio) {
	
	return new ValvesController(
		{
			pinNumbers: _pinNumbers,
			valveIds: _valveIds,
			valveConfig: _valveConfig,
			gpio: _gpio
		}
	)
}

//////////////// Constructor ///////////////////////////
function ValvesController (attr) {
	
	// public:
	this.updateValveState = function (state) {
		for ( var id in state) {
			if (valveState[id])  {
			 	valveState[id] = state[id];
			}
		}
	} 

	this.valvesOnOffByState = function () {
		valvesOnOff();
	}

	// private
    var pinNumbers = attr.pinNumbers; 
	var valveIds = attr.valveIds;
	var valveConfig = attr.valveConfig;

	var valveState = {	
		1: 'off',
		2: 'off'
	};
	var gpio = attr.gpio;
	var allPins = {}; // will be set pinNumber -> gpio pin object		

	for (var i = 0, pin; pin = pinNumbers[i]; i++) {
		allPins[pin] = new gpio(pin, 'out');
		allPins[pin].writeSync(0);
	}

	function valvesOnOff () {
		var currentState, newState;
		for (var i = 0, currentValve; currentValve = valveIds[i]; i++) {
		 currentState = valveConfig[currentValve].currentState;
		 var newState = valveState[currentValve];
			if(currentState != newState) {
				valveOnOff(currentValve, newState);
				valveConfig[currentValve].currentState = newState;
			}
		}
	}

	function valveOnOff(valve, state) {
		var valvePins = valveConfig[valve].states[state].pins;
		for (pin in valvePins) {
			allPins[pin].writeSync(valvePins[pin]);
			console.log('new: ', valve, pin, valvePins[pin]);
		}
	}
}

init();
