import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForegroundComponent } from './foreground.component';

describe('ForegroundComponent', () => {
  let component: ForegroundComponent;
  let fixture: ComponentFixture<ForegroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForegroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForegroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
