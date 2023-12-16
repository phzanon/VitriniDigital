import { Component } from '@angular/core';
import { Geolocalizacao } from 'src/app/model/Geolocalizacao';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { BuscaLocServiceTsService } from 'src/app/services/busca-loc.service.ts.service';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private buscaLocServiceTsService: BuscaLocServiceTsService,
              private estabelecimentoService: EstabelecimentosService) {
    //this.locationsMock = buscaLocServiceTsService.createLocationsMock();
  }

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  mapOptions: google.maps.MapOptions = {
    center: { lat: -23.5489, lng: -46.6388 },
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  markerPosition:any = [/*{ lat: -23.5624065, lng: -46.6542724 },
  { lat: -23.5736, lng: -46.6955 },
  { lat: -23.5624050, lng: -46.6542718 },
  { lat: -23.5624055, lng: -46.6542715 },
  { lat: -23.5624059, lng: -46.6542710 },
  { lat: -23.5624070, lng: -46.6542730 },
  { lat: -23.580497, lng: -46.6446169 }
*/];

  locations:any = [];
  markers: any = [];

  ngOnInit() {

    if (localStorage.getItem('login') === 'OK') {
      localStorage.setItem('login', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('login')
    }
    this.addMarker();
  }

  addMarker() {
    this.estabelecimentoService.buscarEstabelecimentos().subscribe((res) => {
      res.forEach(r => {
        this.markers.push({
          position: {
            lat: Number(r.endereco.latitude.replace(",",".")),
            lng: Number(r.endereco.longitude.replace(",","."))
          },
          label: {
            color: 'black',
            text: `${r.nome}`,
            fontFamily: 'comic sans',
            fontSize: '20px'
          },
          title: `${r.nome}`,
          options: { animation: google.maps.Animation.DROP}
        })
      })
    })
  }

  zoomIn() {
    if (this.zoom < 15) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > 8) this.zoom--;
  }

  visualizarEstabelecimentos() {
    this.buscaLocServiceTsService.visualizarEstabelecimentos();
  }

  retornaPosicoes(): any {
    console.log(this.markerPosition);
    return this.markerPosition;
  }
}
