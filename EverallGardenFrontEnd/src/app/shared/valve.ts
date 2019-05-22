export class Valve {

	constructor(
		public id: string,
		public hardwareId: string,
		public name: string,
		public description: string,
		public start: string,
		public status: any
	) 
	{ 

		this.id = id;
		this.hardwareId = hardwareId;
		this.name = name;
		this.description = description;
		this.start = start;
		this.status = status;
	}	
}
