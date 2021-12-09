import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisChefsComponent } from './mis-chefs.component';

describe('MisChefsComponent', () => {
  let component: MisChefsComponent;
  let fixture: ComponentFixture<MisChefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisChefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
