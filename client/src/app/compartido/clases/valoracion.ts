import { Chef } from './chef';
import { Publicacion } from './publicacion';
export class Valoracion {
  constructor(
      public chef: Chef,
      public publicacion: Publicacion,
      public id: number,
      public calificacion: number
  ) {}
}
