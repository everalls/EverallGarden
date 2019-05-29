import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Valve } from '../shared/valve';

@Component({
	selector: 'app-valve',
	templateUrl: './valve.component.html',
	styleUrls: ['./valve.component.css']
})
export class ValveComponent implements OnInit { 

	@Input() valveData: Valve;
	@Output() valveClick = new EventEmitter();

	constructor() { }

	valveIsOn() {
		if (this.valveData.state === '1') {
			return true;
		} else {
			return false;
		}
	}

	valveIsDisabled() {
		if (this.valveData.state === 'NA') {
			return true;
		} else {
			return false;
		}
	}

	ngOnInit() {
	}

	onValveClick() {
		if (this.valveData.state !== 'NA') {
			this.valveClick.emit(this.valveData); 
		}
	}

}
