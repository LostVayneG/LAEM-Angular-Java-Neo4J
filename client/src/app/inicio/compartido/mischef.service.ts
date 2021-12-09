import { Injectable } from '@angular/core';
import { RestService } from 'src/app/compartido/rest.service';
import { environment } from 'src/environments/environment';
import { Publicacion } from 'src/app/compartido/clases/publicacion';

@Injectable({
  providedIn: 'root'
})
export class MischefService {

  constructor( private rest: RestService) { }
  /**
   * Método para obtener lista de publicaciones de los seguidos
   * @param id id del chef
   */
  findPublicacionesSeguidos(id: number){
    const url = `${environment.urlChef}/chefs/${id}/mischefs`;
    return this.rest.get<Publicacion[]>(url);
  }
}
