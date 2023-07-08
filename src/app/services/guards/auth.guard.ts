import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router,
    private snackBar: MatSnackBar) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!localStorage.getItem('token')) {
      this.showMessageLoginFirst();
      this.router.navigate(['/login']);
      return false;
    }

    // logged in, so return true
    return true;
  }

  showMessageLoginFirst() {
    this.snackBar.open('Falha na autenticação. Faça o login!', 'Opss..', {
      duration: 7000
    });
  }
}