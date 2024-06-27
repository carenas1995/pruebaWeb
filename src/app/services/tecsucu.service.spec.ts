import { TestBed } from '@angular/core/testing';

import { TecsucuService } from './tecsucu.service';

describe('TecsucuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TecsucuService = TestBed.get(TecsucuService);
    expect(service).toBeTruthy();
  });
});
