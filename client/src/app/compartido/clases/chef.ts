export class Chef {

    public numeroPublicaciones: number;
    public numeroSeguidores: number;
    public numeroSeguidos: number;

    constructor(
        public id: number,
        public nickname: string,
        public nombre: string,
        public contrasenia: string,
        public genero: string,
        public celular: string,
        public valoracion: number,
        public rango: string
    ) {}
}
