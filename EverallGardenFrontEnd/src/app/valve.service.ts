import { AngularFireDatabase } from 'angularfire2/database';
import { Valve } from './shared/valve';
import { Injectable } from '@angular/core';
// import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ValveService {

	valvesPath: string;

  constructor(private db: AngularFireDatabase) { 
	  this.valvesPath = 'taps'
  }

  getValves () {
	let list = this.db.list(this.valvesPath);
	return this.db.list(this.valvesPath).valueChanges();;
  }
}
