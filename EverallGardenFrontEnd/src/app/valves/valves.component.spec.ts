import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValvesComponent } from './valves.component';

describe('ValvesComponent', () => {
  let component: ValvesComponent;
  let fixture: ComponentFixture<ValvesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
