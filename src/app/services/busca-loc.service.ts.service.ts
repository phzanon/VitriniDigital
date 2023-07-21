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

  constructor(private httpClient: HttpClient,
    private router: Router,
    private estabelecimentoService: EstabelecimentosService) {
  }

  ngOnInit(): void {

  }

  getLocations(): Geolocalizacao[] {
    var geoloc: Geolocalizacao[] = [];
    var estabelecimentos = this.estabelecimentoService.buscarEstabelecimentos().subscribe(
      (res) => {
        res.forEach(estab => {
          geoloc.push({
            "lat": Number(estab.endereco.latitude),
            "lng": Number(estab.endereco.longitude)
          })
        })

        console.log(geoloc);
      }
    )

    return geoloc;
  }

  visualizarEstabelecimentos() {
    this.router.navigate(['estabelecimentos']);
  }
}
