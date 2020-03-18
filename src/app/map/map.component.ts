import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, ViewChildren, QueryList } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { ApiService } from '../api.service';

mapboxgl.accessToken = environment.mapboxToken;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @ViewChild('map') mapElement: ElementRef;
  @Input() hasGeocoder: boolean;
  @Input() embed: boolean;
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() geocoderResults: EventEmitter<any> = new EventEmitter();
  @ViewChildren(MapPopupComponent) popupComponents: QueryList<MapPopupComponent>;
  map: mapboxgl.Map;
  geocoderMarker: mapboxgl.Marker;
  geocoder: MapboxGeocoder;
  offers: HelpOffer[];
  requests: HelpRequest[];

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  async ngAfterViewInit(): Promise<void> {
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10, 50],
      zoom: 4
    });

    this.map.on('load', async () => {
      if (!this.embed) {
        try {
          this.offers = await this.api.getOffers();
          this.requests = await this.api.getRequests();
        } catch (e) {
          this.snackBar.open('Keine Verbindung zum Server', null, { duration: 3000 });
        }
      }
    });

    this.popupComponents.changes.subscribe(c => {
      c.toArray().forEach((popupComponent: MapPopupComponent) => {
        const marker = new mapboxgl.Marker({
          color: popupComponent.type === 'offer' ? '#3f51b5' : '#ff4081'
        });
        marker.setLngLat(popupComponent.content.address.center);
        marker.addTo(this.map);

        if (popupComponent) {
          const popup = new mapboxgl.Popup().setDOMContent(popupComponent.element.nativeElement);
          // TODO: popup.remove() on click
          marker.setPopup(popup);
        }
      })
    });

    if (this.hasGeocoder) {
      this.geocoder = new MapboxGeocoder({
        accessToken: environment.mapboxToken,
        mapboxgl: mapboxgl,
        proximity: { latitude: 50, longitude: 10 },
        types: 'address',
        language: 'de'    // FIXME: i18n
      }).on('results', (event: { features: any; }) => {
        this.geocoderResults.emit(event.features);
      });
      try {
        this.geocoder.addTo('#geocoder');
      } catch (e) {
        console.error('Failed to add geocoder');
      }
    }
  }

  ngAfterViewChecked() {
    this.map.resize();
  }

  onMore({ content, type }) {
    const event = {};
    event[type] = content;
    this.select.emit(event);
  }
}
