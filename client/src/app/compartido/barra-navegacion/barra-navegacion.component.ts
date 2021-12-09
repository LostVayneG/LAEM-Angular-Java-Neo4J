import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/compartido/login.service';
import { PerfilService } from 'src/app/perfil/compartido/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chef } from '../clases/chef';
import { switchMap } from 'rxjs/operators';
import { BusquedaService } from 'src/app/busqueda/compartido/busqueda.service';
import { Pais } from '../../busqueda/compartido/pais';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private servicioSesion: LoginService,
    private servicioPefil: PerfilService,
    private router: Router,
    private busquedaService: BusquedaService,
    ) { }

  chef: Chef = new Chef(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  tag: string;
  paises: Pais[];
  ubicacionPaises: string;

  ngOnInit(): void {
    this.cargarUsuario();
    this.buscarPaises();
  }

  /**
   * Método para llamar al servicio buscar países
   */
  buscarPaises(){
    this.ubicacionPaises = environment.ubicacionPaises;
    this.route.paramMap
    .pipe(
      switchMap(params => this.busquedaService.findPaises()
    ))
    .subscribe(lista => {
      this.paises = lista;
    });
  }

  /**
   * Método para cargar información del usuario logeado
   */
  cargarUsuario(){
    const id: number = this.servicioPefil.getUserLoggedIn();
    this.route.paramMap
      .pipe(
        switchMap(params => this.servicioPefil.findById(id)
      ))
      .subscribe(usuario => {
        this.chef = usuario;
      });
  }
  /**
   * Método para llamar al servicio cerrar sesión
   */
  logout() {
    this.servicioSesion.logout().subscribe(data => {
        console.log('Logout Ok');
        this.router.navigate(['/login']);
      }, error => {
        console.error(error);

      });
  }

  buscarPorEtiqueta(){
    // this.router.navigate(['/busqueda/etiqueta/' + this.tag]);
    this.redirectTo( '/busqueda/etiqueta/' + this.tag );
  }

  verPerfil(){
    this.redirectTo('/perfil/ver/' + this.chef.id);
  }


  /**
   * Método para enviar petición a búsqueda por país
   * @param id del país buscado
   */
  buscarPorPais(id: number){

     // this.router.navigate(['/busqueda/pais/' + id]);
    this.redirectTo( '/busqueda/pais/' + id);
  }

  redirectTo(uri: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
 }
}
