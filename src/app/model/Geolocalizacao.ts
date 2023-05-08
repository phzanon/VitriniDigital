export class Geolocalizacao {
    latitude: string;
    longitude: string;

    constructor(
        lat: string,
        lng: string
     ) {
        this.latitude = lat;
        this.longitude = lng;
     }
}