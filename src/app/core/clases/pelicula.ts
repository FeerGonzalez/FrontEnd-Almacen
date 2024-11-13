export class Pelicula {
    id !: number;
    titulo !: string;
    sinopsis !: string;
    precio !: number;
    fechaSalida !: string;
    genero !: string;
    condicion !: string;
    imagenPequena !: ImageBitmap;
    imagenGrande !: ImageBitmap;
    directores !: number[];
    actores !: number[];
}

