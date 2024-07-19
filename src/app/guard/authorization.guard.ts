import { CanActivate, CanActivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../service/authorization.service';
import { inject } from '@angular/core';

export const authorizationGuardClient: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authorizationService = inject(AuthorizationService)

  if (!(authorizationService.obterLoginStatus() === 'client')) {
    return false
  }
  return true
}
export const authorizationGuardProvider: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authorizationService = inject(AuthorizationService)
  
  if (!(authorizationService.obterLoginStatus() === 'provider')) {
    return false
  }
  return true
}

// route, state 
