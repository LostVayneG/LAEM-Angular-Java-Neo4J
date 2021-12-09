import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from '../../compartido/clases/publicacion';
import { MischefService } from '../compartido/mischef.service';
import { switchMap } from 'rxjs/operators';
import { PerfilService } from '../../perfil/compartido/perfil.service';

@Component({
  selector: 'app-mis-chefs',
  templateUrl: './mis-chefs.component.html',
  styleUrls: ['./mis-chefs.component.css']
})
export class MisChefsComponent implements OnInit {

  constructor(
    private servicioPerfil: PerfilService,
    private servicioMisChef: MischefService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  publicaciones: Publicacion[];
  imagenes: string[] = [];

  ngOnInit(): void {
    this.buscarPublicacionesMisChef();
  }

  buscarPublicacionesMisChef(){
    const id: number = this.servicioPerfil.getUserLoggedIn();
    this.route.paramMap
      .pipe(
        switchMap(params => this.servicioMisChef.findPublicacionesSeguidos(id)
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
