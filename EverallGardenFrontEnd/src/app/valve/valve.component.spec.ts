import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValveComponent } from './valve.component';

describe('ValveComponent', () => {
  let component: ValveComponent;
  let fixture: ComponentFixture<ValveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
