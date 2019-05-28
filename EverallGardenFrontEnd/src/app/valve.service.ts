import { AngularFireDatabase } from 'angularfire2/database';
import { Valve } from './shared/valve';
import { Injectable } from '@angular/core';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ValveService {

	valvesPath: string;

  constructor(private db: AngularFireDatabase) { 
	  this.valvesPath = 'taps'
  }

  getValves () {
	// let v1 = new Valve(	'xyz', '1', 'Valve1', 'Trees at the front of the house', '1234567890', '1', null)
	// let v2 = new Valve(	'xyz', '2', 'Valve2', 'Plants at the back of the house', '1234567890', '1', null)
	// let v3 = new Valve(	'xyz', '3', 'Valve3', 'Trees at the front of the house', '1234567890', '1', null)
	// let v4 = new Valve(	'xyz', '4', 'Valve4', 'Plants at the back of the house', '1234567890', '1', null)									
	// let valves = [v1, v2, v3, v4];
	// return valves;

	let list = this.db.list(this.valvesPath);
	return this.db.list(this.valvesPath).valueChanges();;

	
  }
}
