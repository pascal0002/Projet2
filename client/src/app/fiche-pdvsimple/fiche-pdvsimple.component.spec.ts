import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePDVSimpleComponent } from './fiche-pdvsimple.component';

describe('FichePDVSimpleComponent', () => {
  let component: FichePDVSimpleComponent;
  let fixture: ComponentFixture<FichePDVSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichePDVSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePDVSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
