import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecomendacionesComponent } from './lista-recomendaciones.component';

describe('ListaRecomendacionesComponent', () => {
  let component: ListaRecomendacionesComponent;
  let fixture: ComponentFixture<ListaRecomendacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRecomendacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
