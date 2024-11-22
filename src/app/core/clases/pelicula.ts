export class Pelicula {
    id !: number;
    titulo !: string;
    sinopsis !: string;
    precio !: number;
    fechaSalida !: string;
    idGenero !: number;
    condicion !: string;
    imagenPequena !: ImageBitmap;
    imagenGrande !: ImageBitmap;
    idsDirectores !: number[];
    idsActores !: number[];
}

