import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDimensionGameCardComponent } from './2d-game-card.component';

describe('TwoDimensionGameCardComponent', () => {
  let component: TwoDimensionGameCardComponent;
  let fixture: ComponentFixture<TwoDimensionGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDimensionGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDimensionGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
