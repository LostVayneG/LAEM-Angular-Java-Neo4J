import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionService } from '../../compartido/publicacion.service';
import { switchMap } from 'rxjs/operators';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { environment } from '../../../../environments/environment';
import { PerfilService } from '../../compartido/perfil.service';
import { Observable } from 'rxjs';
import { Pais } from '../../../busqueda/compartido/pais';
import { BusquedaService } from '../../../busqueda/compartido/busqueda.service';
import { Etiqueta } from '../../../compartido/clases/etiqueta';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {

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
    this.findPaises();
    this.publicacion.etiquetas = [];
    this.publicacion.preparacion = [];
    this.publicacion.ingredientes = [];
    this.video = false;
  }

  /**
   * Método para llamar al servicio crear publicación
   */
  publicar(){
    let body = new FormData();
    body.append('file', this.currentFile);
    this.route.paramMap
      .pipe(
        switchMap(params => this.publicacionService.create(this.publicacion, this.perfilService.getUserLoggedIn()))
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

    // let contenedor = document.getElementById('contenedorSubirArchivo');
    // contenedor.style.backgroundImage = "url(" + event.target.result + ")";
  }

  upload(id) {
    let body = new FormData();
    body.append('file', this.currentFile);
    this.publicacionService.uploadFile(body, id).subscribe(
      (data) => {console.log(data)},
      error => console.log(error),
      () => { console.log('completed') }
    );
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

    if ( this.publicacion.url !== ''){
        this.video = true;
        this.publicacion.url = 'https://www.youtube.com/embed/' + this.publicacion.url.substring(32);
      }
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
