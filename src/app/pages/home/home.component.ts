import { Component } from '@angular/core';
import { BuscaLocServiceTsService } from 'src/app/services/busca-loc.service.ts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private buscaLocServiceTsService: BuscaLocServiceTsService){
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

  markerPosition = [{ lat: -23.5624065, lng: -46.6542724 },
    {lat: -23.5736, lng: -46.6955},
    {lat: -23.5624050, lng: -46.6542718},
    {lat: -23.5624055, lng: -46.6542715},
    {lat: -23.5624059, lng: -46.6542710},
    {lat: -23.5624070, lng: -46.6542730}
  ];

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        //lat: position.coords.latitude,
        //lng: position.coords.longitude,
        lat: -23.5489,
        lng: -46.6388
      };
    });

    var locations = this.buscaLocServiceTsService.getEstabelecimentosLocation();
    console.log(locations);

    //this.markerPosition = this.buscaLocServiceTsService.createLocationsMock();
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
}
