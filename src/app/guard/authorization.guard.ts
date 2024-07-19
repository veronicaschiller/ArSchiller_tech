import { CanActivate, CanActivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../service/authorization.service';
import { inject } from '@angular/core';

export const authorizationGuardClient: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authorizationService = inject(AuthorizationService)
    return authorizationService.obterLoginStatusClient()
  }
export const authorizationGuardProvider: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authorizationService = inject(AuthorizationService)
    return authorizationService.obterLoginStatusProvider()
  }

// route, state 
