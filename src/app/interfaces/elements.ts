import { Tecelement } from "./tecelement";

export interface Elements {
    id?: number,
    nombre: string,
    codigo: string,
    cantidad: number,
    tecelement?:Tecelement[]
}
