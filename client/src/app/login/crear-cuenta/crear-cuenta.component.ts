import { Component, OnInit } from '@angular/core';
import { Chef } from '../../compartido/clases/chef';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearCuentaService } from '../compartido/crear-cuenta.service';
import { PerfilService } from 'src/app/perfil/compartido/perfil.service';
import { LoginService } from '../compartido/login.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  mensaje: string;
  permitir = false;
  verificacionPassword: string;
  chef: Chef = new Chef(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

  constructor(
    private servicioUsuario: CrearCuentaService,
    private perfilService: PerfilService,
    private router: Router,
    private loginService: LoginService
    ) {
   }

  ngOnInit(): void {
    this.chef.nickname = '';
    this.chef.contrasenia = '';
    this.chef.genero = '';
    this.chef.nombre = '';
  }

  registrar(){
    this.verificarCamposVacios();
    if (this.permitir){
      // los campos no están vacíos, llamar función crear cuenta
      this.servicioUsuario
      .register(this.chef)
      .subscribe(
        resultado => {
          this.perfilService.setUserLoggedIn( resultado.id );
          this.loginService.login( this.chef.nickname, this.chef.contrasenia)
          .subscribe(
            resutlado =>
            {
              this.router.navigate(['/inicio']);
            },
            error => {
              this.mensaje = error;
              this.router.navigate(['/login']);
            }
          );
        },
        error => {
          this.mensaje = error;
        }
      );
    }
  }

  verificarCamposVacios(){
    if (this.chef.nickname === '' || this.chef.contrasenia === '' || this.chef.genero === '' ||
    this.chef.nombre === ''){
      this.mensaje = 'Los campos no pueden estar vacíos.';
      this.permitir = false;
    } else {
      if (this.chef.contrasenia !== this.verificacionPassword){
        this.mensaje = 'Las contraseñas no coinciden, por favor verifique los campos.';
        this.permitir = false;
      } else {
        if (this.chef.contrasenia.length >= 8 && this.chef.contrasenia.match('[A-Z]') != null &&
        this.chef.contrasenia.match('[a-z]') && this.chef.contrasenia.match('[0-9]') != null){
          this.mensaje = '';
          this.permitir = true;
        } else {
          this.mensaje = 'La contraseña no cumple con los requisitos mínimos de seguridad:\n ';
          this.mensaje += 'Debe tener 8 o más caracteres y al menos una minúscula, una mayúscula y un número.';
          this.permitir = false;
        }
      }
    }
 }



}
