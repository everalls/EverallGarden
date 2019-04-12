import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Valve } from '../shared/valve';
import { BottomSliderControllerService } from '../bottom-slider-controller.service';
import { SliderActivationRequest } from '../shared/sliderActivationRequest';

@Component({
  selector: 'app-valves',
  templateUrl: './valves.component.html',
  styleUrls: ['./valves.component.css']
})
export class ValvesComponent implements OnInit {

	@Output() valveControlRequest = new EventEmitter();

	valves: Valve[];

	constructor(private bottomSliderController: BottomSliderControllerService) { 

	}

	ngOnInit() {

	let v1 = new Valve(	'xyz', '1', 'Valve1', 'Trees at the front of the house', '1234567', 
							{ order: 'jhgj', state: '1', start: '76587', duration: '876587' }
						);
	
	let v2 = new Valve(	'xyz', '2', 'Valve2', 'Plants at the back of the house', '8657865', 
							{ order: 'jhgj', state: '0', start: '76587', duration: '876587' }
						);	
	
	let v3 = new Valve(	'xyz', '2', 'Valve3', 'Plants at the back of the house', '8657865', 
							{ order: 'jhgj', state: '1', start: '76587', duration: '876587' }	
						);

	let v4 = new Valve(	'xyz', '2', 'Valve4', 'Plants at the back of the house', '8657865', 
							{ order: 'jhgj', state: '0', start: '76587', duration: '876587' }
						);	
						
	this.valves = [v1, v2, v3, v4];						


  }

  onValveClick(request) {
	this.bottomSliderController.requestHandler(
		  new SliderActivationRequest(true, 'valveControlComponent', request)
	);
  }
}
