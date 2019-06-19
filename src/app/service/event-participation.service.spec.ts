import { TestBed } from '@angular/core/testing';

import { EventParticipationService } from './event-participation.service';

describe('EventParticipationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventParticipationService = TestBed.get(EventParticipationService);
    expect(service).toBeTruthy();
  });
});
