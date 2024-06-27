import { Tecelement } from "./tecelement";

export interface Elements {
    id?: Number,
    nombre: string,
    codigo: string,
    cantidad: Number,
    tecelement:Tecelement[]
}
