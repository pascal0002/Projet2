import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePDVLibreComponent } from './fiche-pdvlibre.component';

describe('FichePDVLibreComponent', () => {
  let component: FichePDVLibreComponent;
  let fixture: ComponentFixture<FichePDVLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichePDVLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePDVLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
