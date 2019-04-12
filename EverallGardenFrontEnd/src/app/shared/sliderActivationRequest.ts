export class SliderActivationRequest {
// class to communicate with overlay slider;
// toShow: true to show the slider, false to hide.
// name : which component tp show in the slider;
// data : provided (delegted as-is) to the shown component 
//        (assumed the componenet knows what to do with it.)

	constructor(
			public toShow: boolean,
			public name: string,
			public data: any,
		) { 
			this.toShow = toShow;
			this.name = name;
			this.data = data;
		}	
}