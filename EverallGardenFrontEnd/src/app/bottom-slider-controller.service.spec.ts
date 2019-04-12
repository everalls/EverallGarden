import { TestBed } from '@angular/core/testing';

import { BottomSliderControllerService } from './bottom-slider-controller.service';

describe('BottomSliderControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BottomSliderControllerService = TestBed.get(BottomSliderControllerService);
    expect(service).toBeTruthy();
  });
});
