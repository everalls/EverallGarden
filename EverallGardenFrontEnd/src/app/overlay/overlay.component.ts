import { ValveControlComponent } from './../valve-control/valve-control.component';
import {  Component, Input, OnInit	} from '@angular/core';
import { SliderActivationRequest } from '../shared/sliderActivationRequest';
import { ActivatedRoute } from '@angular/router';
import { BottomSliderControllerService } from '../bottom-slider-controller.service';

@Component({
	selector: 'app-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

	request: SliderActivationRequest;
	
	constructor(private bottomSliderController: BottomSliderControllerService) { 
	}

	ngOnInit() {
		// init empty request - before data ron the service
		// subscribe to requests from the server
		this.request = new SliderActivationRequest(false, '', {});
		this.bottomSliderController.sliderRequest.subscribe(request => {
			this.request = request;
			console.log('subcribed :', request);
		});
	}

	hideSlider() {
		this.request.toShow = false; 
	}

}
