import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valve',
  templateUrl: './valve.component.html',
  styleUrls: ['./valve.component.css']
})
export class ValveComponent implements OnInit {

  valveData = {
    name: 'Valve1',
    description: 'Trees and grass around them',
    id: '1',
    status: '1'
  };

  constructor() { }


  ngOnInit() {
  }

}
