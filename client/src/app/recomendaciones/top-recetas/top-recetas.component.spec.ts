import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecetasComponent } from './top-recetas.component';

describe('TopRecetasComponent', () => {
  let component: TopRecetasComponent;
  let fixture: ComponentFixture<TopRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
