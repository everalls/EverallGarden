import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

	instructionsPath: string; 

	constructor(private db: AngularFirestore) {
		this.instructionsPath = 'instructions';
		                        'instructions'
	}

	create(instruction) {
		return this.db.collection(this.instructionsPath).add(Object.assign({}, instruction));
	
	}

	update(key, instruction) {
		return this.db.collection(this.instructionsPath + '/' + key).doc().update(Object.assign({}, instruction));
	}




}
