import { Utils } from './../shared/utils';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Valve } from '../shared/valve';
import { Radio } from '../shared/radio';
import { ValveInstruction } from '../shared/valve_instruction';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { InstructionService } from '../instruction.service';

@Component({
	selector: 'app-valve-control',
	templateUrl: './valve-control.component.html',
	styleUrls: ['./valve-control.component.css']
})

export class ValveControlComponent implements OnInit {

	@Input() valve: Valve; 

	@Output() done = new EventEmitter();
	timeRadios : Radio[] = []; // arry of objects represen radiobutton
	timeRadiosChoice : number = 0;
	timesArray : number[] = [5, 15, 30, 60];
	instruction: ValveInstruction;
	duration: number = 0;
	newState = '1';

	constructor(private instructionService: InstructionService) { }

	ngOnInit() {
		this.timesArray.forEach((element) => {
			this.timeRadios.push(new Radio(element, 0));
		})
		this.timeRadios[0].state = 1; //first radiobutton is on by default
		this.duration = this.timeRadios[0].value * Utils.MS_IN_MINUTE;

		this.valve = new Valve ( // default
			'NA', 
			'0', 
			'NA', 
			'NA', 
			'NA', 
			 {
				state: '0'
			 }
		)
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
		if(this.valve.status.state === '1') {
			this.newState = '0';
		} else {
			this.newState = '1';
		}
		let instructionData = {
			duration: this.duration,
		}

		this.instruction = new ValveInstruction(
			dateUtc,
			0,
			dateUtc,
			this.valve.id,
			this.newState,
			instructionType,
			instructionData
		);

		this.sendInstruction(this.instruction);
	}

	sendInstruction (instruction) {
		console.log('New instruction : ', this.instruction);
		var self = this; // to see current 'this' inside promise
		//this.db.list('/instructions/').push(instruction).then(instructionCheckAcknowledge);
		this.instructionService.create(instruction).then(instructionCheckAcknowledge);
		function  instructionCheckAcknowledge (ack) {
			//TODO all gthis to be based on real-time acknowledge written to FB by hardware
			console.log('New instruction: ', ack.key); // this is key of new created instruction 
			self.valve.status.state = self.newState;
			if(self.newState == '1') {
				self.disableTimeRadios(true) 
			} else {
				self.disableTimeRadios(false) 
			}
		}
	}

	

	disableTimeRadios (state) {
		this.timeRadios.forEach(radio => (radio.disabled = state));
	}
}