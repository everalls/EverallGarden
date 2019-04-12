// Class representing radiobutton, to be used in time optipons in valve-control component.
// It's possible in the future to extend it to other use cases 
// NOTE: use getter to dinamically build string representing class name   
export class Radio  {
	constructor (	public value: number, //55, 25, 30, 60 minutes
					public state: number,  //0: off, 1: on, 2: disabled
					public unit: string = 'min') {}
	get class() {
		return this.unit + this.value;
	}
}