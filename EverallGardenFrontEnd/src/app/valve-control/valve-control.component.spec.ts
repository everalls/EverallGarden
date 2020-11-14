import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValveControlComponent } from './valve-control.component';

describe('ValveControlComponent', () => {
  let component: ValveControlComponent;
  let fixture: ComponentFixture<ValveControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValveControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
