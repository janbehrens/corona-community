import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import mapboxgl from 'mapbox-gl';
import { MapComponent } from '../map/map.component';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-help-your-neighbour',
  templateUrl: './help-your-neighbour.component.html',
  styleUrls: ['./help-your-neighbour.component.scss']
})
export class HelpYourNeighbourComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  @Input() offer: boolean;
  @Input() need: boolean;
  @Output() open: EventEmitter<string> = new EventEmitter();

  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  messageFormGroup: FormGroup;
  checkupFormGroup: FormGroup;

  addressAutocompleteOptions: any[];

  selectedTasks: string[] = [];
  showSignUpForm = false;

  constructor(private formBuilder: FormBuilder, public auth: AuthService,
    public api: ApiService) {}

  ngOnInit(): void {
    this.nameFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.addressFormGroup = this.formBuilder.group({
      // This value must be an object (geocoder response)
      address: ['', (control: AbstractControl) => {
        if (typeof control.value === 'string') {
          return { required: true };
        }
        return Validators.required(control);
      }]
    });

    this.messageFormGroup = this.formBuilder.group({
      message: ['', Validators.required]
    });

    this.checkupFormGroup = this.offer ? this.formBuilder.group({
      healthy: ['', Validators.required],
      healthDetail: ['']
    }) : this.need ? this.formBuilder.group({
      condition: ['', Validators.required],
      conditionDetail: ['']
    }) : undefined;
  }

  toggleTask(task: string) {
    const i = this.selectedTasks.indexOf(task);
    if (i === -1) {
      this.selectedTasks.push(task);
    } else {
      this.selectedTasks.splice(i, 1);
    }
  }

  onGeocoderInput(event: Event) {
    const search = (event.target as HTMLInputElement).value;

    if (search.length >= 3) {
      this.mapComponent.geocoder.query(search);
    }
  }

  onGeocoderResults(event: any[]) {
    this.addressAutocompleteOptions = event;
  }

  onAddressChange(event: any) {
    const value = (event.option.value);

    if (this.mapComponent.geocoderMarker) {
      this.mapComponent.geocoderMarker.remove();
    }
    this.mapComponent.geocoderMarker = new mapboxgl.Marker({
      color: '#ff4081'
    })
    this.mapComponent.geocoderMarker.setLngLat(value.center).addTo(this.mapComponent.map);
    this.mapComponent.map.flyTo({ center: value.center, zoom: 15, speed: 2.4 });
  }

  displayGeocoderOption(option: any) {
    return option.place_name;
  }

  submit() {
    if (!(this.nameFormGroup.valid && this.addressFormGroup.valid &&
      this.messageFormGroup.valid && this.checkupFormGroup.valid)) {
      return;
    }

    if (!this.auth.user._id) {
      throw new Error('Cannot save, user ID is unknown.');
    }

    const values: HelpOffer | HelpRequest = {
      user: { _id: this.auth.user._id },
      name: this.nameFormGroup.value.name,
      address: this.addressFormGroup.value.address,
      message: this.messageFormGroup.value.message,
      checkup: this.checkupFormGroup.value,
      tasks: this.selectedTasks
    };

    if (this.offer) {
      this.api.saveOffer(values as HelpOffer);
    } else if (this.need) {
      this.api.saveRequest(values as HelpRequest);
    }
  }

  signUp() {
    this.showSignUpForm = true;
  }
}
