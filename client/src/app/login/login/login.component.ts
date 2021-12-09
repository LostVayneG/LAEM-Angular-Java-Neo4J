import { Component, OnInit } from '@angular/core';
import { LoginService } from '../compartido/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PerfilService } from 'src/app/perfil/compartido/perfil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private perfilService: PerfilService) { }

  user = '';
  pass = '';
  mensaje = '';

  ngOnInit() {
  }

  /**
   * Mostrar error en pantalla
   */
  errorLogin(){
    return 'Credenciales incorrectas';
  }

  /**
   * Método para llamar el servicio de iniciar sesión
   */
  login(){
    this.loginService.login(this.user, this.pass).subscribe( aux => {
      this.loginService.getChef(this.user).subscribe( usuario => {
      this.perfilService.setUserLoggedIn( usuario.id );
      this.router.navigate(['inicio']);
      });
    }, error => {
      this.mensaje = this.errorLogin();
    });
  }
}
