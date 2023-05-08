import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estabelecimento } from '../model/estabelecimentos';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { map} from 'rxjs/operators'

const apiEstabelecimentos = environment.apiEstabelecimentos;

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosService {

  constructor(private http: HttpClient) { }

  buscarEstabelecimentos(): Observable<Estabelecimento[]> {
    var est = this.http.get<Estabelecimento[]>(`${apiEstabelecimentos}`);
    console.log(est);
    return est;
  }
}
