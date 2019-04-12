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
		if (this.valveData.status.state === '1') {
			return true;
		} else {
			return false;
		}
	}

	ngOnInit() {
	}

	onValveClick() {
		this.valveClick.emit(this.valveData); 
	}

}
