import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../perfil/compartido/publicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Publicacion } from '../../compartido/clases/publicacion';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent implements OnInit {

  constructor(
    private servicioPublicacion: PublicacionService,
    private route: ActivatedRoute,
    private router: Router) { }

  publicaciones: Publicacion[];
  imagenes: string[] = [];

  ngOnInit(): void {
    this.buscarRecientes();
  }

  /**
   * Método para llamar al servicio buscar publicaciones recientes
   */
  buscarRecientes(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.servicioPublicacion.findRecent()
      ))
      .subscribe(publicaciones => {
        publicaciones.forEach(publicacion => {
          const base64Data = publicacion.archivo;
          this.imagenes[ publicacion.id ] = 'data:image/jpeg;base64,' + base64Data;
          if (publicacion.descripcion != null && publicacion.descripcion.length > 147){
            publicacion.descripcion = publicacion.descripcion.substring(0, 147) + '...';
          }
        });
        this.publicaciones = publicaciones;
      });
  }

}
