import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBusquedaComponent } from './lista-busqueda.component';

describe('ListaBusquedaComponent', () => {
  let component: ListaBusquedaComponent;
  let fixture: ComponentFixture<ListaBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
