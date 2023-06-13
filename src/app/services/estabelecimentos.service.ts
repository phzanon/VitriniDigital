import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estabelecimento } from '../model/estabelecimentos';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { map} from 'rxjs/operators'
import { Router } from '@angular/router';

const apiEstabelecimentos = environment.apiEstabelecimentos;

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosService {

  constructor(private http: HttpClient,
    private router: Router) { }

  buscarEstabelecimentos(): Observable<Estabelecimento[]> {
    var est = this.http.get<Estabelecimento[]>(`${apiEstabelecimentos}`);
    console.log(est);
    return est;
  }

  registrarEstabelecimento() {
    this.router.navigate(['registrar-estabelecimento']);
  }
}

