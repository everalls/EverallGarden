import { ValveService } from './../valve.service';
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

	//valves: Valve[];
	valves$;

	constructor(private bottomSliderController: BottomSliderControllerService, private valveService : ValveService) { 

	}

	ngOnInit() {
		this.valves$ = this.valveService.getValves();
		console.log('valves : ', this.valves$);
  	}

  	onValveClick(request) {
		this.bottomSliderController.requestHandler(
			new SliderActivationRequest(true, 'valveControlComponent', request)
		);
  	}
}
