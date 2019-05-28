import { TestBed } from '@angular/core/testing';

import { ContactosService } from './contactos.service';

describe('ContactosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactosService = TestBed.get(ContactosService);
    expect(service).toBeTruthy();
  });
});
