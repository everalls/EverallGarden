import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Valve } from './shared/valve';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
	
export class ValveService {

	valvesPath = 'taps';

	constructor(private db: AngularFirestore) {}

	getValves() { 
		return this.db.collection(this.valvesPath).valueChanges();
	}
}
