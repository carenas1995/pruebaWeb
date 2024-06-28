import { Tecelement } from "./tecelement";
import { Tecsucu } from "./tecsucu";

export interface Tecnicos {
    id?: number,
    nombre: string,
    codigo: string,
    sueldo: number,
    master: boolean,
    tecsucu?:Tecsucu[],
    tecelement?:Tecelement[]
}
