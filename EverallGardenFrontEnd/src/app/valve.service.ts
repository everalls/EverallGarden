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
		let taps = this.db.collection(this.valvesPath);
		console.log('db:::', this.db);
		console.log('taps:::', taps);

		// return taps;
		return this.db.collection(this.valvesPath).valueChanges();
	}
}
