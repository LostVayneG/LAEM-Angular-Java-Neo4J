import { Component, OnInit, Input } from '@angular/core';
import { PublicacionService } from '../../perfil/compartido/publicacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from '../../compartido/clases/publicacion';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.css']
})
export class ListaPublicacionesComponent implements OnInit {

  constructor(
    ) { }

  @Input() publicaciones: Publicacion[];
  @Input() imagenes: string[] = [];

  ngOnInit(): void {
  }

}
