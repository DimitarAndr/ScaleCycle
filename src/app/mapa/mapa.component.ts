import {Component, OnInit} from '@angular/core';
import data from '../../assets/Storage/PuntsVerds.json';
import {AgmInfoWindow} from '@agm/core';


declare var $: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  punts: any = data;
  mapStyle: any;
  imageCluster: any;
  labelOptions: any;
  icon: any;
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;
  barrios = [
    'Zona Montjuic',
    'La Bordeta',
    'Poble-sec',
    'La Barceloneta',
    'El Poblenou',
    'Sant Marti de Provencals',
    'El Clot',
    'Fort Pienc',
    'Mercat del Ninot',
    'Les Corts',
    'Diagonal Pedralbes',
    'Sagrada Familia',
    'Horta-Guinardo',
    'Sant Andreu',
    'Turo de la Peira'
  ];


  constructor() {
    this.currentIW = null;
    this.previousIW = null;
  }


  ngOnInit() {

    $('#input').autocomplete({
        source: this.barrios
    });

    this.imageCluster = {
      url: './assets/Storage/SVG_Files/recycled-bagEventos1.svg'
    };

    this.icon = {
      url: './assets/Storage/SVG_Files/recycled-bagEventos1.svg',
      scaledSize: {
        width: 40,
        height: 60
      }
    };
    this.mapStyle = [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd'
          }
        ]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        featureType: 'administrative.province',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dadada'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#c9c9c9'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      }
    ];
  }

  mapClick() {
    if (this.previousIW) {
      this.previousIW.close();
    }
  }

  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }

}






