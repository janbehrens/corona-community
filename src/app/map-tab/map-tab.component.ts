import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.component.html',
  styleUrls: ['./map-tab.component.scss']
})
export class MapTabComponent {
  @Input() offer?: HelpOffer;
  @Input() request?: HelpRequest;
  t = {
    'shop': 'Einkaufen',
    'walk': 'Gassi gehen',
    'care': 'Betreuen',
    'talk': 'Reden'
  };    // FIXME: i18n

  onSelect(event: { offer?: HelpOffer; request?: HelpRequest; }) {
    if (event.offer) {
      this.offer = event.offer;
      this.request = null;
    } else if (event.request) {
      this.request = event.request;
      this.offer = null;
    }
  }
}
