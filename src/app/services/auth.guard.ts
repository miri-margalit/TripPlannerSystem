import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './AuthService';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // אם יש משתמש מחובר
  if (authService.currentUser()) {
    return true;
  }

  // אם אין משתמש
  router.navigate(['/login']);
  return false;
};
