import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { Chef } from '../../compartido/clases/chef';

@Component({
  selector: 'app-lista-recomendaciones',
  templateUrl: './lista-recomendaciones.component.html',
  styleUrls: ['./lista-recomendaciones.component.css']
})
export class ListaRecomendacionesComponent implements OnInit {

  constructor() { }

  @Input() resultados: Publicacion[][] = [];
  @Input() chefs: Chef[][] = [];
  @Input() imagen: string[] = [];
  @Input() topRecetas: boolean;

  ngOnInit(): void {
  }

}
