import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedaService } from '../compartido/busqueda.service';
import { Pais } from '../compartido/pais';
import { switchMap } from 'rxjs/operators';
import { Publicacion } from '../../compartido/clases/publicacion';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busquedaService: BusquedaService
    ) { }

  pais: Pais = new Pais(undefined, undefined, undefined);
  publicaciones: Publicacion[];
  resultados: Publicacion[][] = [];
  imagen: string[] = [];

  ngOnInit(): void {
    this.findPais();
    this.findPublicaciones();
  }

  /**
   * Método para llamar al servicio de búsqueda y encontrar un país por id
   */
  findPais(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.busquedaService.findPaisById(+params.get('id'))
      ))
      .subscribe(pais => {
        this.pais = pais;
      });
  }

  /**
   * Método para llamar al servicio de búsqueda y encontrar las publicaciones asociadas a un país
   */
  findPublicaciones(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.busquedaService.findPublicacionesByPais(+params.get('id'))
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
