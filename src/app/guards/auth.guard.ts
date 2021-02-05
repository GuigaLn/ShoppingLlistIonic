import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      /* Verifica se Houve alguma alteracao no usuario logado */
      this.authService.getAuth().onAuthStateChanged(user => {
        /* Se For Nulo ou Indefino, Mandar Para Login */
        if (!user) {
          this.router.navigate(['login']);
        }

        /* Se Existir Usuario Retorna True */
        resolve(user ? true : false);
      })
    });
  }
  
}
