import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPublicacionesComponent } from './lista-publicaciones.component';

describe('ListaPublicacionesComponent', () => {
  let component: ListaPublicacionesComponent;
  let fixture: ComponentFixture<ListaPublicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPublicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
