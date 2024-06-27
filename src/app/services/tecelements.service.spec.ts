import { TestBed } from '@angular/core/testing';

import { TecelementsService } from './tecelements.service';

describe('TecelementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TecelementsService = TestBed.get(TecelementsService);
    expect(service).toBeTruthy();
  });
});
