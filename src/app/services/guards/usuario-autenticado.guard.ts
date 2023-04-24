import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  
  canActivate(){
    if (this.usuarioService.logado) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
