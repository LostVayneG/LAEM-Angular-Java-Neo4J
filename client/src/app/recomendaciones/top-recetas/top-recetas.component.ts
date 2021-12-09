import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { switchMap } from 'rxjs/operators';
import { PublicacionService } from 'src/app/perfil/compartido/publicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/busqueda/compartido/busqueda.service';
import { ValoracionService } from 'src/app/compartido/valoracion.service';
import { RecomendacionesService } from '../compartido/recomendaciones.service';

@Component({
  selector: 'app-top-recetas',
  templateUrl: './top-recetas.component.html',
  styleUrls: ['./top-recetas.component.css']
})
export class TopRecetasComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recomendacionService: RecomendacionesService
  ) { }


  publicaciones: Publicacion[];
  resultados: Publicacion[][] = [];
  imagen: string[] = [];

  ngOnInit(): void {
    this.findPublicaciones();
  }

  /**
   * Método para llamar al servicio de búsqueda y encontrar las publicaciones asociadas a un país
   */
  findPublicaciones(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.recomendacionService.findTopRecetas()
      ))
      .subscribe(lista => {
        this.publicaciones = lista;
        this.loadPublicaciones();
      });
  }

  /**
   * Método para cargar las publicaciones en la tabla en forma de matriz
   */
  loadPublicaciones(){
    if ( this.publicaciones == null ){
      this.resultados = [];
    }
    else{
      let fila = 0;
      this.resultados[fila] = [];
      for (let i = 0; i < this.publicaciones.length; i++) {
        this.resultados[fila].push( this.publicaciones[i] );
        // Asignación de ruta de la imagen a un arreglo de strings
        const base64Data = this.publicaciones[i].archivo ;
        this.imagen[ this.publicaciones[i].id ] = 'data:image/jpeg;base64,' + base64Data;

        if ( (i + 1) % 3 === 0){
          fila++;
          this.resultados[fila] = [];
        }
      }
    }
  }

}
