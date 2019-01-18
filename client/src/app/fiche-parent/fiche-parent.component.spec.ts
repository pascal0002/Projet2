import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheParentComponent } from './fiche-parent.component';

describe('FicheParentComponent', () => {
  let component: FicheParentComponent;
  let fixture: ComponentFixture<FicheParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
