import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';


export const autentificateGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  return new Observable<boolean>(observe => {  
    authService.me().subscribe({
      next(value) {
        observe.next(true)
      },
      error(err) {
        router.navigate(['/login'])
      },
    })
  })
};