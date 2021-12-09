import { Chef } from './chef';
import { Publicacion } from './publicacion';
export class Comentario {

  constructor(
    public chef: Chef,
    public publicacion: Publicacion,
    public id: number,
    public texto: string,
    public fecha: Date
  ) {}
}
