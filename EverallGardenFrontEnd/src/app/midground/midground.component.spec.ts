import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MidgroundComponent } from './midground.component';

describe('MidgroundComponent', () => {
  let component: MidgroundComponent;
  let fixture: ComponentFixture<MidgroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MidgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
