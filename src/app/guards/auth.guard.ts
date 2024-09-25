import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);  // Inyecta el Router
  const token = sessionStorage.getItem('token');  // Verifica si hay un token almacenado

  if (token) {
    return true;  // Si el token existe, permite el acceso
  } else {
    // Si no hay token, redirige al login
    router.navigate(['/login']);
    return false;
  }
};
