import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopChefsComponent } from './top-chefs.component';

describe('TopChefsComponent', () => {
  let component: TopChefsComponent;
  let fixture: ComponentFixture<TopChefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopChefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
