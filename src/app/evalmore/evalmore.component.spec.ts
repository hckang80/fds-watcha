import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalmoreComponent } from './evalmore.component';

describe('EvalmoreComponent', () => {
  let component: EvalmoreComponent;
  let fixture: ComponentFixture<EvalmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
