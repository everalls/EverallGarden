import { Injectable, EventEmitter, Output, OnInit, Directive } from '@angular/core';
import { SliderActivationRequest } from './shared/sliderActivationRequest';

@Directive()
@Injectable({
  providedIn: 'root'
})

export class BottomSliderControllerService {

	@Output() sliderRequest: EventEmitter<SliderActivationRequest> = new EventEmitter();

	constructor() { }

	requestHandler (request: SliderActivationRequest) {
		this.sliderRequest.emit(request);
	}
}


