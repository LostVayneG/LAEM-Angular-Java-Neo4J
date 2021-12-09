import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent} from './login/landing-page/landing-page.component';
import { LoginComponent } from './login/login/login.component';
import { MenuInicioComponent } from './inicio/menu-inicio/menu-inicio.component';
import { VerPublicacionComponent } from './perfil/publicacion/ver-publicacion/ver-publicacion.component';
import { CrearPublicacionComponent } from './perfil/publicacion/crear-publicacion/crear-publicacion.component';
import { CrearCuentaComponent } from './login/crear-cuenta/crear-cuenta.component';
import { EditarPerfilComponent } from './perfil/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './perfil/ver-perfil/ver-perfil.component';
import { EditarPublicacionComponent } from './perfil/publicacion/editar-publicacion/editar-publicacion.component';
import { MisChefsComponent } from './inicio/mis-chefs/mis-chefs.component';
import { TopRecetasComponent } from './recomendaciones/top-recetas/top-recetas.component';
import { PaisComponent } from './busqueda/pais/pais.component';
import { EtiquetaComponent } from './busqueda/etiqueta/etiqueta.component';
import { FavoritosComponent } from './perfil/favoritos/favoritos.component';
import { TopChefsComponent } from './recomendaciones/top-chefs/top-chefs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CrearCuentaComponent},
  { path: 'landing', component: LandingPageComponent },
  { path: 'inicio', component: MenuInicioComponent},
  { path: 'top/recetas', component: TopRecetasComponent},
  { path: 'top/chefs', component: TopChefsComponent},
  { path: 'publicacion/ver/:id', component: VerPublicacionComponent},
  { path: 'publicacion/crear', component: CrearPublicacionComponent},
  { path: 'publicacion/editar/:id', component: EditarPublicacionComponent},
  { path: 'perfil/editar', component: EditarPerfilComponent },
  { path: 'perfil/ver/:id', component: VerPerfilComponent },
  { path: 'misChefs', component: MisChefsComponent },
  { path: 'busqueda/pais/:id', component: PaisComponent },
  { path: 'busqueda/etiqueta/:tag', component: EtiquetaComponent },
  { path: 'favoritos/:id', component: FavoritosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
