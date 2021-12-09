import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Identifiers } from '@angular/compiler';
import { Valoracion } from './clases/valoracion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private rest: RestService) { }

  /**
   * Método para crear una valoración
   * @param idPublicacion id de la publicacion valorada
   * @param idChef id del chef que valora
   * @param valoracion calificacion
   */
  create( idPublicacion: number, idChef: number, valoracion: number ){
    const url = `${environment.urlPublicacion}/valoracion/${idPublicacion}/${idChef}`;
    return this.rest.post<Valoracion>(url, {
      id: null,
      calificacion: valoracion,
      chef: null,
      publicacion: null
    });
  }

  /**
   * Método para obtener una valoración por id
   * @param idChef id del chef que valora
   * @param idPublicacion id de la publicacion valorada
   */
  getById( idChef: number, idPublicacion: number){
    const url = `${environment.urlPublicacion}/valoracion/${idPublicacion}/${idChef}`;
    return this.rest.get<Valoracion>(url);
  }

  /**
   * Método para actualizar una valoracion
   * @param valoracion valoracion a actualizar
   */
  update( valoracion: Valoracion ){
    const url = `${environment.urlPublicacion}/valoracion/${valoracion.id}`;
    return this.rest.put<Valoracion>(url, {
      id: valoracion.id,
      calificacion: valoracion.calificacion,
      chef: valoracion.chef,
      publicacion: valoracion.publicacion
    });
  }





}
