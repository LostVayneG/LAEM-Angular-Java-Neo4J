import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Publicacion } from '../../compartido/clases/publicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { RecomendacionesService } from '../compartido/recomendaciones.service';
import { Chef } from '../../compartido/clases/chef';

@Component({
  selector: 'app-top-chefs',
  templateUrl: './top-chefs.component.html',
  styleUrls: ['./top-chefs.component.css']
})
export class TopChefsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recomendacionService: RecomendacionesService
  ) { }


  chefs: Chef[];
  resultados: Chef[][] = [];

  ngOnInit(): void {
    this.findChefs();
  }

  /**
   * Método para llamar al servicio de búsqueda y encontrar los chefs del top
   */
  findChefs(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.recomendacionService.findTopChefs()
      ))
      .subscribe(lista => {
        this.chefs = lista;
        this.loadChefs();
      });
  }

  /**
   * Método para cargar los chefs en la tabla en forma de matriz
   */
  loadChefs(){
    if ( this.chefs == null ){
      this.resultados = [];
    }
    else{
      let fila = 0;
      this.resultados[fila] = [];
      for (let i = 0; i < this.chefs.length; i++) {
        this.resultados[fila].push( this.chefs[i] );
        if ( (i + 1) % 3 === 0){
          fila++;
          this.resultados[fila] = [];
        }
      }
    }
  }

}
