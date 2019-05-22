export class ValveInstruction {  
	// type: 
	// 0 : immediate one-time for given time 
	// 1 : immediate with  delay
	// other tipes TBD 
	constructor(
		public creation_date: string, // UTC date string
		public delay: number,
		public start_date: string,
		public valveId: string,
		public valve_new_state: string, // like '0', '1'
		public type: string, // '0', '1', '2' etc.
		public data: any // here will be type-specific fields. For type 0: duration. For other types: TBD	
	) 
	{ 
		this.creation_date = creation_date;
		this.delay = delay;
		this.start_date = start_date;
		this.valveId = valveId;
		this.type = type;
		this.data = data;	
	}			
}