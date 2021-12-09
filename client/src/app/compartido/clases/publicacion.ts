import { Chef } from './chef';
import { Etiqueta } from './etiqueta';
import { Pais } from 'src/app/busqueda/compartido/pais';

export class Publicacion {
    public archivo: any;
    public url: string;
    public ingredientes: string[];
    public preparacion: string[];
    public chef: Chef;
    public etiquetas: Etiqueta[];
    public numeroComentarios: number;
    public numeroValoraciones: number;
    public pais: Pais;

    constructor(
        public id: number,
        public titulo: string,
        public duracion: string,
        public fecha: Date,
        public descripcion: string,
        public valoracion: number
    ) {}
}
