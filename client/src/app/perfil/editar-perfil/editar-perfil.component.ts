import { Component, OnInit } from '@angular/core';
import { Chef } from '../../compartido/clases/chef';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionService } from '../compartido/publicacion.service';
import { switchMap } from 'rxjs/operators';
import { PerfilService } from '../compartido/perfil.service';
import { CrearCuentaService } from 'src/app/login/compartido/crear-cuenta.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  mensaje: string;
  permitir = false;
  verificacionPassword: string;
  chef: Chef = new Chef(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  /**
   * Método para cargar información del usuario logeado
   */
  cargarUsuario(){
    const id: number = this.perfilService.getUserLoggedIn();
    this.route.paramMap
      .pipe(
        switchMap(params => this.perfilService.findById(id)
      ))
      .subscribe(usuario => {
        usuario.contrasenia = '';
        this.chef = usuario;
      });
  }

  editarPerfil(){
    this.verificarCamposVacios();
    if (this.permitir){
      // los campos no están vacíos, llamar función crear cuenta
      this.route.paramMap
      .pipe(
        switchMap(params => this.perfilService.update(this.chef))
      )
      .subscribe(chef => {
        // this.chef = chef;

        this.router.navigate(['perfil/ver', chef.id]);
      }, error =>{
          this.mensaje = error;
        }
      );
    }
  }

  verificarCamposVacios(){
    if (this.chef.nickname == null || this.chef.contrasenia == null || this.chef.genero == null ||
    this.chef.nombre == null){
      this.mensaje = 'Los campos no pueden estar vacíos.';
      this.permitir = false;
    } else {
      if (this.chef.contrasenia !== this.verificacionPassword){
        this.mensaje = 'Las contraseñas no coinciden, por favor verifique los campos.';
        this.permitir = false;
      } else {
        this.mensaje = '';
        this.permitir = true;
      }
    }

  }
}
