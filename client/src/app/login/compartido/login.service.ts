import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../../compartido/rest.service';
import { Chef } from '../../compartido/clases/chef';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private rest: RestService
    ) { }

  /**
   * Método para realizar el inicio de sesión
   * @param username nickname del chef
   * @param password contraseña del chef
   */
  login(username: string, password: string) {
    const formHeaders = new HttpHeaders();
    formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const formParams = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(`${environment.urlChef}/login`, null, {
      headers: formHeaders,
      params: formParams,
      withCredentials: true
    });
  }

  /**
   * Método para invocar petición get y encontrar al chef logueado
   * @param nick nickname del chef
   */
  getChef(nick: string) {
    const url = `${environment.urlChef}/chefs/logged/${nick}`;
    return this.rest.get<Chef>(url);
  }

  /**
   * Método para invocar petición post y salir de la aplicación
   */
  logout() {
    return this.http.post(`${environment.urlChef}/logout`, '', {
      withCredentials: true
    });
  }

}
