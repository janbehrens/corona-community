import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html'
})
export class MapPopupComponent {
  @Input() type: string;
  @Input() content: HelpOffer | HelpRequest;
  @Output() more: EventEmitter<any> = new EventEmitter();
  iconMap = {
    'shop': 'shopping_cart',
    'walk': 'pets',
    'care': 'supervised_user_circle',
    'talk': 'phone_in_talk'
  };

  constructor(public element: ElementRef) { }

  open(content: HelpOffer | HelpRequest) {
    this.more.emit({ content: content, type: this.type });
  }
}
