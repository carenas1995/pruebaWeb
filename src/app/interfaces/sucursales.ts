import { Tecsucu } from "./tecsucu";

export interface Sucursales {
    id?: number,
    nombre: string,
    codigo: string,
    tecsucu?:Tecsucu[]
}
