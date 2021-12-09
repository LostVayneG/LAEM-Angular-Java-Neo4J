import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../compartido/perfil.service';
import { switchMap } from 'rxjs/operators';
import { Chef } from '../../compartido/clases/chef';
import { PublicacionService } from '../compartido/publicacion.service';
import { Publicacion } from '../../compartido/clases/publicacion';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private perfilService: PerfilService,
    private publicacionService: PublicacionService) { }

  chef: Chef = new Chef(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  publicaciones: Publicacion[][] = [];
  numPublicaciones = 0;
  imagen: string[] = [];
  miPerfil = false;
  mensaje = 'Publicar Receta';
  imagenValoracion = '';

  ngOnInit(): void {
    // Verificar que el usuario loggeado sea el mismo usuario del perfil actual
    this.miPerfil = this.perfilService.getUserLoggedIn() == this.route.snapshot.paramMap.get('id');
    this.findChef();
    this.findPublicaciones();

  }

  verificarSeguidor(){
    this.route.paramMap
    .pipe(
      switchMap(params => this.perfilService.verificar( this.chef.id, this.perfilService.getUserLoggedIn())
    ))
    .subscribe(verificado => {
      this.mensaje = (verificado) ? 'Dejar de seguir' : 'Seguir';
    });
  }

  /**
   * Método para llamar al servicio buscar perfil por id
   */
  findChef(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.perfilService.findById(+params.get('id'))
      ))
      .subscribe(chef => {
        this.chef = chef;
        if ( this.miPerfil === false){
          this.verificarSeguidor();
        } else {
          this.mensaje = 'Publicar Receta';
        }
        this.actualizarValoracionChef();
      });
  }

  actualizarValoracionChef() {
    let num = '';
    num = (this.chef.valoracion < 1 && num === '') ? '0' : num;
    num = (this.chef.valoracion < 1.5 && num === '') ? '1' : num;
    num = (this.chef.valoracion < 2 && num === '') ? '1,5' : num;
    num = (this.chef.valoracion < 2.5 && num === '') ? '2' : num;
    num = (this.chef.valoracion < 3 && num === '') ? '2,5' : num;
    num = (this.chef.valoracion < 3.5 && num === '') ? '3' : num;
    num = (this.chef.valoracion < 4 && num === '') ? '3,5' : num;
    num = (this.chef.valoracion < 4.5 && num === '') ? '4' : num;
    num = (this.chef.valoracion < 4.8 && num === '') ? '4,5' : num;
    num = (this.chef.valoracion >= 4.8 && num === '') ? '5' : num;
    this.imagenValoracion = '/assets/icons/Estrellas/' + num + '_Estrellas.png';
  }

  /**
   * Método para llamar al servicio buscar publicaciones asociadas a un chef
   */
  findPublicaciones(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.findAll(+params.get('id'))
      ))
      .subscribe(publicaciones => {

        if ( publicaciones == null ){
          this.publicaciones = [];
        }
        else{
          let fila = 0;
          this.publicaciones[fila] = [];
          for (let i = 0; i < publicaciones.length; i++) {
            if (publicaciones[i].descripcion != null && publicaciones[i].descripcion.length > 97){
              publicaciones[i].descripcion = publicaciones[i].descripcion.substring(0, 97) + '...';
            }
            this.publicaciones[fila].push( publicaciones[i] );
            // Asignación de ruta de la imagen a un arreglo de strings
            const base64Data = publicaciones[i].archivo ;
            this.imagen[ publicaciones[i].id ] = 'data:image/jpeg;base64,' + base64Data;

            if ( (i + 1) % 3 === 0){
              fila++;
              this.publicaciones[fila] = [];
            }
          }
        }
      });
  }

  accionSeguidor(){
    if ( this.mensaje === 'Seguir'){
      this.seguir();
    }else{
      this.dejarDeSeguir();
    }
    this.ngOnInit();
  }

  seguir(){
    this.route.paramMap
    .pipe(
      switchMap(params => this.perfilService.seguir(this.chef.id, this.perfilService.getUserLoggedIn())
    ))
    .subscribe(chef => {
      this.chef = chef;
      this.mensaje = 'Dejar de seguir';
    }, error => {this.ngOnInit(); });
  }

  dejarDeSeguir(){
    this.route.paramMap
    .pipe(
      switchMap(params => this.perfilService.dejarDeSeguir(this.chef.id, this.perfilService.getUserLoggedIn())
    ))
    .subscribe(chef => {
      this.chef = chef;
      this.mensaje = 'Seguir';
    });
  }
}
