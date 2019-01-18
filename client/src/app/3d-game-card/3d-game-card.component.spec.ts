import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimensionGameCardComponent } from './3d-game-card.component';

describe('ThreeDimensionGameCardComponent', () => {
  let component: ThreeDimensionGameCardComponent;
  let fixture: ComponentFixture<ThreeDimensionGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDimensionGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDimensionGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
