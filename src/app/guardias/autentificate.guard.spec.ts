import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autentificateGuard } from './autentificate.guard';

describe('autentificateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autentificateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
