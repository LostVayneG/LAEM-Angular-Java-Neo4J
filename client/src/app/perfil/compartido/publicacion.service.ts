import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestService } from 'src/app/compartido/rest.service';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { Etiqueta } from 'src/app/compartido/clases/etiqueta';
import { Comentario } from 'src/app/compartido/clases/comentario';
import { Chef } from '../../compartido/clases/chef';


@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(
     private rest: RestService,
     private http: HttpClient,
     ) { }

  /**
   * Método para invocar petición get y encontrar una publicación por id
   * @param id de la publicación
   */
  findById( id: number){
    const url = `${environment.urlPublicacion}/publicaciones/${id}`;
    return this.rest.get<Publicacion>(url);
  }

  /**
   * Método para invocar petición get y encontrar las publicaciones asociadas a un chef
   * @param idChef id del chef al cual le pertenecen las publicaciones
   */
  findAll( idChef: number) {
    const url = `${environment.urlPublicacion}/chefs/${idChef}/publicaciones`;
    return this.rest.get<Publicacion[]>(url);
  }

  /**
   * Método para invocar petición get y encontrar las publicaciones recientes
   * @returns arreglo de publicaciones recientes
   */
  findRecent() {
    const url = `${environment.urlPublicacion}/publicaciones/recientes`;
    return this.rest.get<Publicacion[]>(url);
  }

  /**
   * Método para agregar una publicacion a favoritos
   * @returns chef actualizado
   */
  agregarFavorita(idChef: number, idPublicacion: number) {
    const url = `${environment.urlPublicacion}/chefs/${idChef}/favoritos/${idPublicacion}`;
    return this.rest.get<Chef>(url);
  }

  /**
   * Método para eliminar una publicacion de favoritos
   * @returns chef actualizado
   */
  eliminarFavorita(idChef: number, idPublicacion: number) {
    const url = `${environment.urlPublicacion}/chefs/${idChef}/Eliminarfavoritos/${idPublicacion}`;
    return this.rest.get<Chef>(url);
  }

  findFavorita(idChef: number){
    const url = `${environment.urlPublicacion}/chefs/${idChef}/favoritos`;
    return this.rest.get<Publicacion[]>(url);
  }

  /**
   * Método para invocar petición post y crear una publicación asociada a un chef
   * @param publicacion a crear
   * @param idChef id del chef que crea la publicación
   */
  create( publicacion: Publicacion, idChef: number){
    const url = `${environment.urlPublicacion}/publicaciones/${idChef}`;
    return this.rest.post<Publicacion>(url, {
      id: undefined,
      descripcion: publicacion.descripcion ,
      fecha: undefined,
      duracion: publicacion.duracion ,
      titulo: publicacion.titulo ,
      valoracion: publicacion.valoracion,
      archivo: undefined,
      chef: undefined,
      etiquetas: publicacion.etiquetas,
      ingredientes: publicacion.ingredientes,
      numeroComentarios: undefined,
      numeroValoraciones: undefined,
      preparacion: publicacion.preparacion,
      url: publicacion.url,
      pais: publicacion.pais
    });
  }

  uploadFile(body: FormData , id: number) {
    const url = `${environment.urlPublicacion}/publicaciones/${id}/uploadFile`;
    return this.http.post(url, body);
  }

  /**
   * Método para invocar petición put y actualizar una publicación
   * @param publicacion a editar
   */
  update( publicacion: Publicacion){
    const url = `${environment.urlPublicacion}/publicaciones`;
    return this.rest.put<Publicacion>(url, {
      id: publicacion.id,
      descripcion: publicacion.descripcion ,
      duracion: publicacion.duracion ,
      fecha: publicacion.fecha ,
      titulo: publicacion.titulo ,
      valoracion: publicacion.valoracion ,
      archivo : undefined,
      chef: publicacion.chef,
      etiquetas: publicacion.etiquetas,
      ingredientes: publicacion.ingredientes,
      numeroComentarios: publicacion.numeroComentarios,
      numeroValoraciones: publicacion.numeroValoraciones,
      preparacion: publicacion.preparacion,
      url: publicacion.url,
      pais: publicacion.pais
    });
  }

  /**
   * Método para invocar petición delete y eliminar una publicación por id
   * @param id de la publicación a eliminar
   */
  delete( id: number){
    const url = `${environment.urlPublicacion}/publicaciones/${id}`;
    return this.rest.delete<Publicacion>(url);
  }

  createComentario( idPublicacion: number , idChef: number, comentario: string ) {
    const url = `${environment.urlPublicacion}/comentario/${idPublicacion}/${idChef}`;
    return this.rest.post<Comentario>(url, {
      id: undefined,
      texto: comentario,
      fecha: undefined,
      chef: undefined,
      publicacion: undefined,
    });
  }

  getComentarios(  idPublicacion: number) {
    const url = `${environment.urlPublicacion}/comentario/${idPublicacion}`;
    return this.rest.get<Comentario[]>(url);
  }

}
