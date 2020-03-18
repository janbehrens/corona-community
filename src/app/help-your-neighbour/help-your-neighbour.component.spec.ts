import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpYourNeighbourComponent } from './help-your-neighbour.component';

describe('HelpYourNeighbourComponent', () => {
  let component: HelpYourNeighbourComponent;
  let fixture: ComponentFixture<HelpYourNeighbourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpYourNeighbourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpYourNeighbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
