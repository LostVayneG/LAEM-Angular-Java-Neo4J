import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { LandingPageComponent } from './login/landing-page/landing-page.component';
import { CrearCuentaComponent } from './login/crear-cuenta/crear-cuenta.component';
import { BarraNavegacionComponent } from './compartido/barra-navegacion/barra-navegacion.component';
import { AccesosComponent } from './compartido/accesos/accesos.component';
import { EditarPerfilComponent } from './perfil/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './perfil/ver-perfil/ver-perfil.component';
import { CrearPublicacionComponent } from './perfil/publicacion/crear-publicacion/crear-publicacion.component';
import { EditarPublicacionComponent } from './perfil/publicacion/editar-publicacion/editar-publicacion.component';
import { VerPublicacionComponent } from './perfil/publicacion/ver-publicacion/ver-publicacion.component';
import { ListaPublicacionesComponent } from './inicio/lista-publicaciones/lista-publicaciones.component';
import { MenuInicioComponent } from './inicio/menu-inicio/menu-inicio.component';
import { MisChefsComponent } from './inicio/mis-chefs/mis-chefs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { TopRecetasComponent } from './recomendaciones/top-recetas/top-recetas.component';
import { ListaRecomendacionesComponent } from './recomendaciones/lista-recomendaciones/lista-recomendaciones.component';
import { PaisComponent } from './busqueda/pais/pais.component';
import { EtiquetaComponent } from './busqueda/etiqueta/etiqueta.component';
import { ListaBusquedaComponent } from './busqueda/lista-busqueda/lista-busqueda.component';
import { TopChefsComponent } from './recomendaciones/top-chefs/top-chefs.component';
import { FavoritosComponent } from './perfil/favoritos/favoritos.component';
import { ValoracionComponent } from './compartido/valoracion/valoracion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    CrearCuentaComponent,
    BarraNavegacionComponent,
    AccesosComponent,
    EditarPerfilComponent,
    VerPerfilComponent,
    CrearPublicacionComponent,
    EditarPublicacionComponent,
    VerPublicacionComponent,
    MenuInicioComponent,
    MisChefsComponent,
    ListaPublicacionesComponent,
    TopRecetasComponent,
    ListaRecomendacionesComponent,
    PaisComponent,
    EtiquetaComponent,
    ListaBusquedaComponent,
    TopChefsComponent,
    FavoritosComponent,
    ValoracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

