import { TestBed } from '@angular/core/testing';

import { ValveService } from './valve.service';

describe('ValveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValveService = TestBed.get(ValveService);
    expect(service).toBeTruthy();
  });
});
