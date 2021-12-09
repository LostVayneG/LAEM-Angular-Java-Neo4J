import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionService } from '../../compartido/publicacion.service';
import { switchMap } from 'rxjs/operators';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { NONE_TYPE } from '@angular/compiler';
import { PerfilService } from '../../compartido/perfil.service';
import { Chef } from '../../../compartido/clases/chef';
import { Comentario } from 'src/app/compartido/clases/comentario';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.css']
})

export class VerPublicacionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicacionService: PublicacionService,
    private perfilservice: PerfilService,
    private sanitizer: DomSanitizer) { }

  publicacion: Publicacion = new Publicacion(undefined, undefined, undefined, undefined, undefined, undefined);
  chef: Chef = new Chef(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  imagen = '';
  base64Data: any;
  favorito = false;
  id: number;
  comentarios: Comentario[] = [];
  texto: string;
  existeVideo = false;
  miPublicacion = false;
  existeDescripcion = false;
  existeDuracion = false;
  existeIngrediente = false;
  existePasos = false;

  ngOnInit(): void {
    this.findPublicacion();
    this.findChef();
  }


  /**
   * Método para llamar al servicio buscar publicación por id
   */
  findPublicacion(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.findById(+params.get('id'))
      ))
      .subscribe(publicacion => {
        this.publicacion = publicacion;
        this.base64Data = this.publicacion.archivo;
        this.imagen = 'data:image/jpeg;base64,' + this.base64Data;
        this.getComentarios();
        this.getFavorito();
        this.existeVideo = (this.publicacion.url !== '');
        this.miPublicacion = (this.perfilservice.getUserLoggedIn() === this.publicacion.chef.id);
        this.existeDescripcion = (this.publicacion.descripcion != null);
        this.existeDuracion = (this.publicacion.duracion != null);
        this.existeIngrediente = (this.publicacion.ingredientes.length > 0);
        this.existePasos = (this.publicacion.preparacion.length > 0);
      });
  }

  getURL(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.publicacion.url);
  }

  getFavorito(){
    this.route.paramMap
          .pipe(
            switchMap(params => this.publicacionService.findFavorita( this.perfilservice.getUserLoggedIn())
            )).subscribe( publicaciones => {
              publicaciones.forEach(p => {
                if ( p.id === this.publicacion.id){
                  this.favorito = true;
                }

              });
            });
  }

  getComentarios(){
    this.route.paramMap
          .pipe(
            switchMap(params => this.publicacionService.getComentarios( this.publicacion.id )
            )).subscribe( comentarios => {
              if ( this.comentarios != null)
              {
                this.comentarios = comentarios;
              }
            });
  }

  agregarComentario(){
    this.route.paramMap
          .pipe(
            switchMap(params =>
              this.publicacionService.createComentario(this.publicacion.id, this.perfilservice.getUserLoggedIn(), this.texto)
            )).subscribe( comentario => {
              this.comentarios.push( comentario );
              this.texto = '';
            });
  }


  redirigir(){
    this.router.navigate(['/publicacion/editar', this.publicacion.id]);
  }

  agregarFavoritos(){
    this.id = this.perfilservice.getUserLoggedIn();
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.agregarFavorita(this.id, this.publicacion.id)
      ))
      .subscribe(chef => {
        this.favorito = true;
      });
  }

  eliminarFavoritos(){
    this.id = this.perfilservice.getUserLoggedIn();
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.eliminarFavorita(this.id, this.publicacion.id)
      ))
      .subscribe(chef => {
        this.favorito = false;
      });
  }

  findChef(){
    this.id = this.perfilservice.getUserLoggedIn();
    this.route.paramMap
      .pipe(
        switchMap(params => this.perfilservice.findById(this.id)
      ))
      .subscribe(chef => {
        this.chef = chef;
      });
  }

}
