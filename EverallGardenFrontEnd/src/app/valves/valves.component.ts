import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valves',
  templateUrl: './valves.component.html',
  styleUrls: ['./valves.component.css']
})
export class ValvesComponent implements OnInit {

  valves = ['valve1', 'valve2', 'valve3', 'valve4'];

  constructor() { }

  ngOnInit() {
  }

}
