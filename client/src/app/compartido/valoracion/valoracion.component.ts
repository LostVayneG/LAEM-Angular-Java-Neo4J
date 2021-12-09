import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValoracionService } from '../valoracion.service';
import { PerfilService } from 'src/app/perfil/compartido/perfil.service';
import { Publicacion } from '../clases/publicacion';
import { Valoracion } from '../clases/valoracion';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private valoracionService: ValoracionService,
    private perfilService: PerfilService
  ) { }
  @Input() publicacion: Publicacion;
  existeValoracion = false;
  valoracion: Valoracion = new Valoracion(undefined, undefined, undefined, undefined);
  pintar: boolean[] = [false, false, false, false, false];

  ngOnInit(): void {
    this.valoracionService.getById( this.perfilService.getUserLoggedIn(), this.publicacion.id)
    .subscribe(valoracion => {
        this.valoracion = valoracion;
        this.existeValoracion = true;
        this.pintar[ valoracion.calificacion - 1] = true;
      }, error => {
      }
    );

  }

  countStar(star) {
    console.log( star );
    this.valoracion.calificacion = star;
    this.valoracionService.create(this.publicacion.id, this.perfilService.getUserLoggedIn(), star).subscribe(
      v => {
        this.valoracion = v;
      }
    );
  }

}
