import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxOfficeRankingComponent } from './box-office-ranking.component';

describe('BoxOfficeRankingComponent', () => {
  let component: BoxOfficeRankingComponent;
  let fixture: ComponentFixture<BoxOfficeRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxOfficeRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxOfficeRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
