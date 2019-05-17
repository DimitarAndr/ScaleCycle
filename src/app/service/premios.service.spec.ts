import { TestBed } from '@angular/core/testing';

import { PremiosService } from './premios.service';

describe('PremiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiosService = TestBed.get(PremiosService);
    expect(service).toBeTruthy();
  });
});
