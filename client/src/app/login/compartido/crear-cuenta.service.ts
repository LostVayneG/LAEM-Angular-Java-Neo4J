import { Injectable } from '@angular/core';
import { Chef } from '../../compartido/clases/chef';
import { environment } from 'src/environments/environment';
import { RestService } from '../../compartido/rest.service';

@Injectable({
  providedIn: 'root'
})
export class CrearCuentaService {

  constructor(private rest: RestService) {}

  /**
   * Método para invocar petición post y registrar al nuevo chef
   * @param chef a registrar
   */
  register( chef: Chef ){
    const url = `${environment.urlChef}/register`;
    return this.rest.post<Chef>(url, {
      id: null,
      nickname: chef.nickname,
      nombre: chef.nombre,
      contrasenia: chef.contrasenia,
      genero: chef.genero,
      celular: chef.celular,
      valoracion: chef.valoracion,
      rango: chef.rango,
      numeroSeguidos: null,
      numeroSeguidores: null,
      numeroPublicaciones: null
    });
  }

}
