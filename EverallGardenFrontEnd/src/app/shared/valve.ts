import { ValveInstruction } from './valve_instruction';
export class Valve {

	constructor(
		public id: string, // same as DB key 
		public hardwareId: string, // same as hardware logic pin name 1,2,3,4 (not pin numbers in PI!).
		public name: string,
		public description: string,
		public lastOperationDate: string,
		public state: string, //'0', '1'
		public currentInstructions: ValveInstruction[]
	) 
	{ 
		this.id = id;
		this.hardwareId = hardwareId;
		this.name = name;
		this.description = description;
		this.lastOperationDate = lastOperationDate;
		this.state = state;
		this.currentInstructions = currentInstructions;
	}	
}
