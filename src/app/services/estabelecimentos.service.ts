import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estabelecimento, EstabelecimentoDto } from '../model/estabelecimentos';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

const apiEstabelecimentos = environment.apiEstabelecimentos;

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosService {

  constructor(private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService) { }

  buscarEstabelecimentos(): Observable<Estabelecimento[]> {
    var est = this.http.get<Estabelecimento[]>(`${apiEstabelecimentos}`);
    console.log(est);
    return est;
  }

  registrarEstabelecimento() {
    this.router.navigate(['registrar-estabelecimento']);
  }

  salvarEstabelecimento(estabelecimentoDto: EstabelecimentoDto): Observable<Estabelecimento> {

    let body = this.montarBodyEstabelecimento(estabelecimentoDto);

    console.log(body);

    this.usuarioService.logar(
      {
        "username": `${localStorage.getItem('username')}`,
        "password": `${localStorage.getItem('password')}`
      }
    ).subscribe((response) => {
    });


    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let optionsUser = {headers: headers}

    var est = this.http.post<Estabelecimento>(`${apiEstabelecimentos}`, body, optionsUser);

    return est;
  }

  montarBodyEstabelecimento(estabelecimentoDto: EstabelecimentoDto) {
    return `{
      \"idUsuario\": \"${localStorage.getItem('id')}\",
      \"nome\": \"${estabelecimentoDto.nome}\",
      \"tipoEstabelecimento\": ${estabelecimentoDto.tipoEstabelecimento},
      \"telefone1\": \"${estabelecimentoDto.telefone1}\",
      \"telefone2\": \"${estabelecimentoDto.telefone2}\",
      \"enderecoDto\": {
        \"logradouro\": \"${estabelecimentoDto.logradouro}\",
        \"cep\": \"${estabelecimentoDto.cep}\",
        \"complemento\": \"${estabelecimentoDto.complemento}\",
        \"numero\": \"${estabelecimentoDto.numero}\",
        \"pontoReferencia\": \"${estabelecimentoDto.pontoReferencia}\",
        \"cidade\": \"${estabelecimentoDto.cidade}\",
        \"bairro\": \"${estabelecimentoDto.bairro}\",
        \"uf\": \"${estabelecimentoDto.uf}\",
        \"latitude\": \"-23.580497\",
        \"longitude\": \"-46.6446169\"
      },
      \"portfolioDto\": {
        \"links\": [
          {
            \"url\": \"${estabelecimentoDto.link}\"
          }
        ],
        \"imagens\": [
          {
            \"imageContent\": \"vedfrgerkgjhekrngergjhwvefw3ef2157e4rgerg32541gre\"
          }
        ]
      }
    }`;
  }

  redirectDados() {
    this.router.navigate(['dados-estabelecimento']);
  }

  atualizarEstabelecimento(estabelecimento: Estabelecimento) {

    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let optionsUser = {headers: headers}

    this.http.put(`${apiEstabelecimentos}`, estabelecimento, optionsUser).subscribe((res) => {});
  }
}

