import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueListeDesPartiesComponent } from './vue-liste-des-parties.component';

describe('VueListeDesPartiesComponent', () => {
  let component: VueListeDesPartiesComponent;
  let fixture: ComponentFixture<VueListeDesPartiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueListeDesPartiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueListeDesPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
