import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from '../../compartido/clases/publicacion';

@Component({
  selector: 'app-lista-busqueda',
  templateUrl: './lista-busqueda.component.html',
  styleUrls: ['./lista-busqueda.component.css']
})
export class ListaBusquedaComponent implements OnInit {

  constructor() { }

  @Input() resultados: Publicacion[][] = [];
  @Input() imagen: string[] = [];

  ngOnInit(): void {
  }

}
