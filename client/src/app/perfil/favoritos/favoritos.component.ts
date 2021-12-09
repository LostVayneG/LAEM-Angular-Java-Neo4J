import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionService } from '../compartido/publicacion.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicacionService: PublicacionService
  ) { }

  publicaciones: Publicacion[];
  resultados: Publicacion[][] = [];
  imagen: string[] = [];

  ngOnInit(): void {
    this.buscarPorEtiqueta();
  }

  buscarPorEtiqueta(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.findFavorita(+params.get('id'))
      ))
      .subscribe(publicaciones => {
        console.log(publicaciones);
        this.publicaciones = publicaciones;
        this.loadPublicaciones();
      });
  }

  loadPublicaciones(){
    if ( this.publicaciones == null ) {
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
