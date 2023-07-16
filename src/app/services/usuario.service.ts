import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/IUsuario';
import { Token } from '../model/token';
import { application, response } from 'express';
import { json } from 'body-parser';
import { Estabelecimento } from '../model/estabelecimentos';
import { Usuario } from '../model/Usuario';

const apiUrlUsuario = environment.apiUrl + "Usuario";
const apiLoginUrl = environment.apiLoginUrl
const signUpUrl = environment.signUpUrl;
const apiUsuario = environment.apiUsuario;
const apiRecuperarSenhaUrl = environment.apiRecuperarSenhaUrl;

const header = new HttpHeaders(
  {
    'Content-Type': 'application/json'
  })
let options = { headers: header }

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


  autenticarUsuario(usuario: IUsuario): Observable<Token> {
    let completeBody = `{\"email\":\"${usuario.username}\", \"password\":\"${usuario.password}\"}`;

    var token = this.httpClient.post<Token>(`${apiLoginUrl}`, completeBody, options).pipe(
      tap((response) => {
        console.log(response.access_token)
        localStorage.setItem('token', `${response.access_token}`);
      })
    );

    return token;
  }

  recuperarSenha(usuario: IUsuario)
  {
    var urlRecuperarSenhaFinal = apiRecuperarSenhaUrl + '?email=' + usuario.username;
    this.httpClient.put(`${urlRecuperarSenhaFinal.trim()}`, options).subscribe();
  }

  cadastrarNovoUsuario(usuario: IUsuario): Observable<any> {

    this.autenticarUsuario({ username: "final@final.com", "password": "123" });

    console.log(localStorage.getItem("token"));

    let completeBody = `{\"email\":\"${usuario.username}\", \"password\":\"${usuario.password}\"}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let optionsUser = { headers: headers }


    return this.httpClient.post<HttpResponse<any>>(`${apiUsuario}`, completeBody, optionsUser).pipe(
      tap((resposta) => {
        console.log(resposta);
        if (!resposta.ok) return;
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(resposta.body.accessToken));
        /*localStorage.setItem('email', JSON.stringify(resposta.body.email));
        localStorage.setItem('password')*/
        localStorage.setItem('id', resposta.body.id);
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
      ? JSON.parse(localStorage.getItem('token') || '')
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

  loginPage() {
    this.router.navigate(['login']);
  }

  cadastroNovoUsuario() {
    this.router.navigate(['cadastro-usuario']);
  }

  buscarUsuario(username: string, password: string): Observable<Usuario> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let optionsUser = { headers: headers }

    let retorno: Usuario[] = [];

    let estabelecimento = this.httpClient.get<Usuario>(`${apiUsuario}/${username}`, optionsUser);
    console.log(estabelecimento);

    return estabelecimento;
  }

  dadosUsuario() {
    this.router.navigate(['dados-usuario']);
  }
}
