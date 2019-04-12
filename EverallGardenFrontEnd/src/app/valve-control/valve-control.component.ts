import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Valve } from '../shared/valve';
import { Radio } from '../shared/radio'

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

	

	constructor() { }

	ngOnInit() {
		this.timesArray.forEach((element) => {
			this.timeRadios.push(new Radio(element, 0));
		})
		this.timeRadios[0].state = 1; //first radiobutton is on by default
	}

	onDone() {
		this.done.emit();
	}

	onTimeRadioClick(index) {
		this.timeRadios.forEach((element) => { element.state = 0 });
		this.timeRadios[index].state = 1;
		this.timeRadiosChoice = index;
		console.log('Valve will run for ', this.timeRadios[index].value, ' ', this.timeRadios[index].unit);
		
	}
}
