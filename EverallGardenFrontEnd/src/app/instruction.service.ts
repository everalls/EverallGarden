import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
	  return this.db.list('instructions').push(product);
  }
}
