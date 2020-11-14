import { Utils } from './../shared/utils';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Valve } from '../shared/valve';
import { Radio } from '../shared/radio';
import { ValveInstruction } from '../shared/valve_instruction';
import { InstructionService } from '../instruction.service';

@Component({
	selector: 'app-valve-control',
	templateUrl: './valve-control.component.html',
	styleUrls: ['./valve-control.component.css']
})

export class ValveControlComponent implements OnInit {

	@Input() valve: Valve; 

	@Output() done = new EventEmitter();
	timeRadios : Radio[] = []; // arry of objects represent radiobutton
	timeRadiosChoice : number = 0;
	timesArray : number[] = [5, 15, 30, 60];
	instruction: ValveInstruction;
	duration: number = 0;
	newState = '1';

	constructor(private instructionService: InstructionService) { }

	ngOnInit() {
		//radio buttons state
		this.timesArray.forEach((element) => {
			this.timeRadios.push(new Radio(element, 0));
		})
		this.timeRadios[0].state = 1; //first radiobutton is on by default
		this.duration = this.timeRadios[0].value * Utils.MS_IN_MINUTE;
		if(this.valve.state == '1') {
				this.disableTimeRadios(true);
		}
	}

	onDone() {
		this.done.emit();
	}

	onTimeRadioClick(index) {
		this.timeRadios.forEach((element) => { element.state = 0 });
		this.timeRadios[index].state = 1;
		this.timeRadiosChoice = index;
		this.duration = this.timeRadios[index].value * Utils.MS_IN_MINUTE;
	}

	onOnOffClick() {
		let dateUtc = new Date().toUTCString();
		let instructionType = '0' // one-time on or off
		if(this.valve.state === '1') {
			this.newState = '0';
		} else {
			this.newState = '1';
		}
		let instructionData = {
			duration: this.duration,
		}

		this.instruction = new ValveInstruction(
			null,
			dateUtc,
			0,
			dateUtc,
			this.valve.id,
			this.valve.hardwareId,
			this.newState,
			instructionType,
			instructionData
		);

		this.sendInstruction(this.instruction);
	}

	sendInstruction (instruction) {
		// console.log('New instruction is sent : ', this.instruction);
		var self = this; // to access current 'this' inside promise callback;
		// this.instructionService.create(instruction)
		// .then(instructionUpdateId)
		// .then(instructionCheckAcknowledge)
		// .catch(error => logErrorInPromise(error))

		function logErrorInPromise (error) {
			//TODO popup or message to user
			console.log('There is an error in promise while sending instruction to hardware : ', error);
		}

		function  instructionCheckAcknowledge () {
			console.log('Updated instruction : ');
			
			
			
		}

		function instructionUpdateId (instruction) {
			var id = instruction.key;
			var incrementalData = {
				'id': id
			};
			console.log('Got new instruction ID, ', id);
			console.log('Instruction succsesfully sent. Done.')
			
			// Update state : 
			self.valve.state = self.newState;
			if(self.newState == '1') {
				self.disableTimeRadios(true) 
			} else {
				self.disableTimeRadios(false) 
			}


			return self.instructionService.update(id, incrementalData);
		}
	}

	
	disableTimeRadios (state) {
		this.timeRadios.forEach(radio => (radio.disabled = state));
	}
}