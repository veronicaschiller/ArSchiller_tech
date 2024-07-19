import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authorizationGuardClient, authorizationGuardProvider } from './authorization.guard';

describe('authorizationGuardClient', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authorizationGuardClient(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

describe('authorizationGuardProvider', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authorizationGuardProvider(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
