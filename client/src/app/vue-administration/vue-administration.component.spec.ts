import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueAdministrationComponent } from './vue-administration.component';

describe('VueAdministrationComponent', () => {
  let component: VueAdministrationComponent;
  let fixture: ComponentFixture<VueAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
