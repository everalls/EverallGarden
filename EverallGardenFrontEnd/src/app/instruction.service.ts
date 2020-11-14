import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

	instructionsPath: string; 

	constructor(private db: AngularFirestore) {
		this.instructionsPath = 'instructions'; 
	}

	create(instruction) {
		//return this.db.list(this.instructionsPath).push(instruction);
	
	}

	update(key, instruction) {
		//return this.db.object(this.instructionsPath + '/' + key).update(instruction);
	}




}
