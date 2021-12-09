import { Injectable } from '@angular/core';
import { RestService } from 'src/app/compartido/rest.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { Pais } from './pais';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient, private rest: RestService) { }

  /**
   * Método para encontrar la lista de publicaciones asociadas a una etiqueta
   * @param tag nombre de la etiqueta
   */
  findByEtiqueta( tag: string){
    console.log(tag);
    const url = `${environment.urlPublicacion}/etiqueta/${tag}`;
    return this.rest.get<Publicacion[]>(url);
  }

  /**
   * Método para invocar petición get y encontrar los países del sistema
   */
  findPaises(){
    const url = `${environment.urlPublicacion}/paises`;
    return this.rest.get<Pais[]>(url);
  }

  /**
   * Método para invocar petición get y encontrar un país por id
   * @param id del país solicitado
   */
  findPaisById( id: number){
    const url = `${environment.urlPublicacion}/paises/${id}`;
    return this.rest.get<Pais>(url);
  }

  /**
   * Método para invocar petición get y encontrar publicaciones asociadas a un país
   * @param id del país solicitado
   */
  findPublicacionesByPais( id: number){
    const url = `${environment.urlPublicacion}/paises/${id}/publicaciones`;
    return this.rest.get<Publicacion[]>(url);
  }

}
