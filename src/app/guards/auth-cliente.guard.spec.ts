import { TestBed, async, inject } from '@angular/core/testing';

import { AuthClienteGuard } from './auth-cliente.guard';

describe('AuthClienteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthClienteGuard]
    });
  });

  it('should ...', inject([AuthClienteGuard], (guard: AuthClienteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
