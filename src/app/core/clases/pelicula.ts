export class Pelicula {
  id!: number;
  titulo!: string;
  sinopsis!: string;
  precio!: number;
  fechaSalida!: string;
  genero!: { id: number; nombre: string };
  condicion!: string;
  imagenPequena!: ImageBitmap | null;
  imagenGrande!: ImageBitmap | null;
  directores!: { id: number; nombre: string; apellido: string }[];
  actores!: { id: number; nombre: string; apellido: string }[];
  portada?: string;
}
