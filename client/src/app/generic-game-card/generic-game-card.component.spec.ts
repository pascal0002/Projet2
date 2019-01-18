import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericGameCardComponent } from './generic-game-card.component';

describe('GenericGameCardComponent', () => {
  let component: GenericGameCardComponent;
  let fixture: ComponentFixture<GenericGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
