import { Injectable } from '@angular/core';
import { RestService } from 'src/app/compartido/rest.service';
import { Publicacion } from 'src/app/compartido/clases/publicacion';
import { Chef } from 'src/app/compartido/clases/chef';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  constructor(private rest: RestService) { }

  findTopRecetas(){
    const url = `${environment.urlPublicacion}/valoracion/top-recetas`;
    return this.rest.get<Publicacion[]>(url);
  }

  findTopChefs(){
    const url = `${environment.urlChef}/valoracion/top-chefs`;
    return this.rest.get<Chef[]>(url);
  }
}
