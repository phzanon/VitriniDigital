import { Injectable } from '@angular/core';
import { Cupom } from '../model/Cupom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const apiCupom = environment.apiCupom;

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private router: Router) { }

  user: Usuario;

  salvarCupom(cupom: Cupom) {
    this.usuarioService.logar(
      {
        "username": `${localStorage.getItem('username')}`,
        "password": `${localStorage.getItem('password')}`
      }
    ).subscribe((response) => {
    });

    /*this.usuarioService.buscarUsuario(`${localStorage.getItem('username')}`, `${localStorage.getItem('password')}`).pipe(
      map((response: Usuario) => {
        console.log(response);
        this.user = response;
      })
    );*/

    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let optionsUser = {headers: headers}

    this.http.post<Cupom>(`${apiCupom}`, cupom, optionsUser);

    //redirecionar para visualização de cupons
  }

  buscarCupons(): Observable<Cupom[]> {
    this.usuarioService.logar(
      {
        "username": `${localStorage.getItem('username')}`,
        "password": `${localStorage.getItem('password')}`
      }
    ).subscribe((response) => {
      localStorage.setItem('token', response.access_token);
    });

    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let optionsUser = {headers: headers}

    return this.http.get<Cupom[]>(`${apiCupom}/estabelecimento/${localStorage.getItem('idEstabelecimento')}`, optionsUser);
  }

  redirectCadastroCupom() {
    this.router.navigate(['cadastro-cupom']);
  }

  redirectExibirCupons() {
    this.router.navigate(['cupons']);
  }
}
