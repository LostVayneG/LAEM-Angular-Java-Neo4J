import { Injectable } from '@angular/core';
import { RestService } from '../../compartido/rest.service';
import { Chef } from '../../compartido/clases/chef';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {


  private isUserLoggedIn;
  public userLogged: number;

  constructor(
    private rest: RestService) {
    this.isUserLoggedIn = false;
  }

  /**
   * Método para invocar petición put y actualizar los datos de un chef
   * @param chef a editar
   */
  update(chef: Chef) {
    const url = `${environment.urlChef}/chefs`;
    return this.rest.put<Chef>(url, {
      id: chef.id,
      nickname: chef.nickname,
      nombre: chef.nombre,
      contrasenia: chef.contrasenia,
      genero: chef.genero,
      celular: chef.celular,
      valoracion: chef.valoracion,
      rango: chef.rango,
      numeroSeguidos: chef.numeroSeguidos,
      numeroSeguidores: chef.numeroSeguidores,
      numeroPublicaciones: chef.numeroPublicaciones
    });
  }

  /**
   * Método para invocar petición get y encontrar un chef por id
   * @param id del chef
   */
  findById(
    id: number // : Observable<Usuario>
  ) {
    const url = `${environment.urlChef}/chefs/${id}`;
    return this.rest.get<Chef>(url);
  }

  seguir(idSeguido: number, idSeguidor: number){
    const url = `${environment.urlChef}/chefs/${idSeguido}/${idSeguidor}`;
    return this.rest.get<Chef>(url);
  }

  dejarDeSeguir(idSeguido: number, idSeguidor: number){
    const url = `${environment.urlChef}/chefs/${idSeguido}/${idSeguidor}`;
    return this.rest.delete<Chef>(url);
  }

  verificar(idSeguido: number, idSeguidor: number){
    const url = `${environment.urlChef}/chefs/verificar/${idSeguido}/${idSeguidor}`;
    return this.rest.get<boolean>(url);
  }
  /**
   * Método para asignar usuario logueado
   * @param id id del usuario logueado
   */
  setUserLoggedIn( id: number){
    this.isUserLoggedIn = true;
    this.userLogged = id;
    localStorage.setItem('currentUser', JSON.stringify(this.userLogged));
  }

  /**
   * Método para obtener usuario logueado
   */
  getUserLoggedIn( ){
    return JSON.parse( localStorage.getItem('currentUser'));
  }



}
