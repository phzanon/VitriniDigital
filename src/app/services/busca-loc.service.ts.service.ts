import { Injectable } from '@angular/core';
import { Endereco } from '../model/endereco';
import { Geolocalizacao } from '../model/Geolocalizacao';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { ResponseGoogleMaps } from '../model/ResponseGoogleMaps';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { EstabelecimentosService } from './estabelecimentos.service';
import { Estabelecimento } from '../model/estabelecimentos';

@Injectable({
  providedIn: 'root'
})
export class BuscaLocServiceTsService {

  private locations: Array<Geolocalizacao>;
  private locationsMock: Array<Geolocalizacao>;
  private estabelecimentos: Estabelecimento[];


  /* url para busca https://maps.googleapis.com/maps/api/geocode/json?address=dracena&key=AIzaSyDrWNvYF5ZeWJ2a6W8wYWrmTQx_SyncexU */
  /* this.geometry.location.lat */
  /* this.geometry.location.lng */
  /* Concatenar a rua + cidade + estado */

  constructor(private httpClient: HttpClient,
    private router: Router,
    private estabelecimentoService: EstabelecimentosService) {
  }

  ngOnInit(): void {

  }

  getEstabelecimentosLocation() {
    let obs = this.estabelecimentoService.buscarEstabelecimentos();
    let teste:any = [];
    obs.subscribe(x => {
      this.estabelecimentos = x;
      x.forEach(estabelecimento => {
        teste.push({"lat": `${estabelecimento.endereco.latitude}`,
                  "lng": `${estabelecimento.endereco.longitude}`})
      })
    });

    console.log(teste);
    /*this.estabelecimentos.forEach(estabelecimento => {
      teste.push({"lat": `${estabelecimento.endereco.latitude}`,
                  "lng": `${estabelecimento.endereco.longitude}`})
    });*/

    return teste;
  }

  getLocation(url: string): Observable<ResponseGoogleMaps> {
    return this.httpClient.get<ResponseGoogleMaps>(url).pipe(
      tap((resposta) => {
        if(resposta != null) return;
      })
    )
  }

  createLocationsMock(): Array<Geolocalizacao> {
    this.locationsMock.push(
      new Geolocalizacao("-23.5489", "-46.6388")
    );

    this.locationsMock.push(
      new Geolocalizacao("-23.5450", "-46.6380")
    );

    this.locationsMock.push(
      new Geolocalizacao("-23.5480", "-46.6385")
    );

    this.locationsMock.push(
      new Geolocalizacao("-23.5460", "-46.6370")
    );

    this.locationsMock.push(
      new Geolocalizacao("-23.5456", "-46.6379")
    );

    return this.locationsMock;
  }

  visualizarEstabelecimentos() {
    this.router.navigate(['estabelecimentos']);
  }
}
