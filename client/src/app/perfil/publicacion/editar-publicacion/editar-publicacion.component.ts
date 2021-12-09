import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionService } from '../../compartido/publicacion.service';
import { switchMap } from 'rxjs/operators';
import { Publicacion } from '../../../compartido/clases/publicacion';
import { PerfilService } from '../../compartido/perfil.service';
import { Pais } from '../../../busqueda/compartido/pais';
import { Etiqueta } from '../../../compartido/clases/etiqueta';
import { BusquedaService } from '../../../busqueda/compartido/busqueda.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css']
})
export class EditarPublicacionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicacionService: PublicacionService,
    private busquedaService: BusquedaService,
    private perfilService: PerfilService,
    private sanitizer: DomSanitizer) { }

  publicacion: Publicacion = new Publicacion(undefined, undefined, undefined, undefined, undefined, undefined);
  tag = '';
  selectedFiles: FileList;
  currentFile: File;
  message = '';
  paises: Pais[];
  paso = '';
  ingrediente = '';
  video = false;

  ngOnInit(): void {
    this.cargarPublicacion();
    this.findPaises();
  }

  /**
   * Método para cargar la publicacion actual
   */
  cargarPublicacion(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.findById(+params.get('id')))
      )
      .subscribe(publicacion => {
        this.publicacion = publicacion;
        this.publicacion.etiquetas = (publicacion.etiquetas == null) ? [] : publicacion.etiquetas;
        this.publicacion.ingredientes = (publicacion.ingredientes == null) ? [] : publicacion.ingredientes;
        this.publicacion.url = (publicacion.url == null) ? '' : publicacion.url;
        if (publicacion.url !== ''){
          this.video = true;
        } else {
          this.video = false;
        }
      });
  }
  /**
   * Método para llamar al servicio editar publicación
   */
  editarPublicacion(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.update(this.publicacion))
      )
      .subscribe(publicacion => {
        this.publicacion = publicacion;
        this.upload(this.publicacion.id);
        this.redirectTo( '/perfil/ver/' + this.perfilService.getUserLoggedIn() );
      });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    this.message = this.currentFile.name;
    console.log(this.currentFile);
  }

  upload(id) {
    let body = new FormData();
    body.append('file', this.currentFile);
    this.publicacionService.uploadFile(body, id).subscribe(
      (data) => {console.log(data)}
    );
  }


  /**
   * Método para llamar al servicio eliminar publicación
   */
  eliminarPublicacion(){
    const respuesta = confirm('¿Está seguro de que quiere eliminar la publicación?');
    if ( respuesta ){
      this.route.paramMap
        .pipe(
          switchMap(params => this.publicacionService.delete(this.publicacion.id))
        )
        .subscribe(publicacion => {
          this.redirectTo( '/perfil/ver/' + this.perfilService.getUserLoggedIn() );
        });
    }
  }

  findPaises() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busquedaService.findPaises())
      )
      .subscribe(paises => {
        this.paises = paises;
      });
  }

  addTag(){
    let addtag = true;
    this.publicacion.etiquetas.forEach((actual, i) => {
      if (actual.tag === this.tag){
        addtag = false;
      }
    });
    if (addtag && this.tag !== ''){
      let etiqueta: Etiqueta = new Etiqueta(undefined, this.tag);
      this.publicacion.etiquetas.push(etiqueta);
    }
    this.tag = '';
  }

  addIngrediente(){
    let addIngrediente = true;
    this.publicacion.ingredientes.forEach((actual, i) => {
      if (actual === this.ingrediente){
        addIngrediente = false;
      }
    });
    if (addIngrediente && this.ingrediente !== ''){
      this.publicacion.ingredientes.push(this.ingrediente);
    }
    this.ingrediente = '';
  }

  addPaso(){
    let addPaso = true;
    this.publicacion.preparacion.forEach((actual, i) => {
      if (actual === this.paso){
        addPaso = false;
      }
    });
    if (addPaso && this.paso !== ''){
      this.publicacion.preparacion.push(this.paso);
    }
    this.paso = '';
  }

  addVideo(){
    this.video = true;
    this.publicacion.url = 'https://www.youtube.com/embed/' + this.publicacion.url.substring(32);
  }

  deleteTag(etiqueta: Etiqueta){
    this.publicacion.etiquetas.forEach((actual, i) => {
      if (actual.tag === etiqueta.tag){
        this.publicacion.etiquetas.splice(i, 1);
      }
    });
  }

  deleteIngrediente(ingrediente: string){
    this.publicacion.ingredientes.forEach((actual, i) => {
      if (actual === ingrediente){
        this.publicacion.ingredientes.splice(i, 1);
      }
    });
  }

  deletePaso(paso: string){
    this.publicacion.preparacion.forEach((actual, i) => {
      if (actual === paso){
        this.publicacion.preparacion.splice(i, 1);
      }
    });
  }

  previewVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.publicacion.url);
  }

  /**
   * Método para cancelar la operación
   */
  cancelar(){
    this.router.navigate(['/perfil/ver', this.perfilService.getUserLoggedIn()]);
  }

  redirectTo(uri: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri])).then(() => location.reload());
  }

}
