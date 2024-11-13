export class Venta{
    id !: number;
    fecha !: string;
    clienteId !: number;
    peliculasCompradasIds !: number[];
    precioTotal !: number;
    descuentosIds !: number;
    precioConDescuento !: number;
}