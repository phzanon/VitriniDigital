import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/IUsuario';

const apiUrlUsuario = environment.apiUrl + "Usuario";
const apiLoginUrl = environment.apiLoginUrl

const header = new HttpHeaders(
  {'Content-Type': 'application/x-www-form-urlencoded'
  })
let options = { headers: header}

let grant_type = 'password';
let client_id = 'marraia-api';
let client_secret = 'JXCgUy5wvOet9jN6QG6XIbHJrQUaHTVd';
let body = `grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient,
    private router: Router) { }


  logar(usuario: IUsuario): Observable<any> {

    /*let completeBody = body + `&username=${usuario.username}&password=${usuario.password}`;

    return this.httpClient.post(`${apiLoginUrl}`, completeBody, options).pipe(
      tap((resposta) => {
        console.log(resposta);
      })
    );*/

    /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
      }));*/

    return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
      if (!resposta.sucesso) return;

      localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
      localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
      this.router.navigate(['cadastro-estabelecimento']);
      //this.router.navigate(['estabelecimentos']);
      //neste caso vai direcionar para os dados do estabelecimento
    }));
  }

  cadastrarNovoUsuario(usuario: IUsuario): Observable<any> {
    let completeBody = body + `&username=${usuario.username}&password=${usuario.password}`;

    return this.httpClient.post<HttpResponse<any>>(`${apiLoginUrl}`, completeBody, options).pipe(
      tap((resposta) => {
        console.log(resposta);
        if(!resposta.ok) return;
        localStorage.setItem('token', JSON.stringify(resposta.body.accessToken));
        /*localStorage.setItem('email', JSON.stringify(resposta.body.email));
        localStorage.setItem('password')*/
      })
    );
  }

  private mockUsuarioLogin(usuario: IUsuario): Observable<any> {
    var retornoMock: any = [];

    if (usuario.username === "hello@balta.io" && usuario.password == "123") {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
      return of(retornoMock);
    }

    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): IUsuario {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario') || ''))
      : null;
  }

  get obterIdUsuarioLogado(): string {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario') || '')) as IUsuario).username
      : null || '';
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token') || ''))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  visualizarEstabelecimentos() {
    this.router.navigate(['estabelecimentos']);
  }

  paginaPrincipal() {
    this.router.navigate(['home']);
  }

  login() {
    this.router.navigate(['login']);
  }

  cadastroNovoUsuario() {
    this.router.navigate(['cadastro-estabelecimento']);
  }
}
