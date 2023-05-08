import { Injectable } from '@angular/core';
import { Endereco } from '../model/endereco';
import { Geolocalizacao } from '../model/Geolocalizacao';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { ResponseGoogleMaps } from '../model/ResponseGoogleMaps';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuscaLocServiceTsService {

  private locations: Array<Geolocalizacao>;
  private locationsMock: Array<Geolocalizacao>;

  
  /* url para busca https://maps.googleapis.com/maps/api/geocode/json?address=dracena&key=AIzaSyDrWNvYF5ZeWJ2a6W8wYWrmTQx_SyncexU */
  /* this.geometry.location.lat */
  /* this.geometry.location.lng */
  /* Concatenar a rua + cidade + estado */

  constructor(private httpClient: HttpClient,
    private router: Router) {
  }

  buscaLocalizacao(logradouro: string,
    cidade: string,
    estado: string) {
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    //var geolocalizacao: Geolocalizacao;
    var location = URL + "?address=" + logradouro + " " + cidade + " " + estado;
    location = location + "&key=" + "AIzaSyDrWNvYF5ZeWJ2a6W8wYWrmTQx_SyncexU"
    var geolocalizacao = this.getLocation(location);
    var geoloc: Geolocalizacao;
    if(geolocalizacao != null) {
      geolocalizacao.pipe(map((response) => {
        geoloc = new Geolocalizacao(response.results[0].location.lat, 
          response.results[0].location.lng)
          this.locations.push(geoloc);
      })); 
    }
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