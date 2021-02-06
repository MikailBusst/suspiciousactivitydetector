import { TestBed } from '@angular/core/testing';

import { ActivityDetectorService } from './activity-detector.service';

describe('ActivityDetectorService', () => {
  let service: ActivityDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
