import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTasteComponent } from './user-taste.component';

describe('UserTasteComponent', () => {
  let component: UserTasteComponent;
  let fixture: ComponentFixture<UserTasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
