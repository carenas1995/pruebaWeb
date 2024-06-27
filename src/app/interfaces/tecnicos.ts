import { Tecelement } from "./tecelement";
import { Tecsucu } from "./tecsucu";

export interface Tecnicos {
    id?: Number,
    nombre: string,
    codigo: string,
    sueldo: Number,
    master: boolean,
    tecsucu:Tecsucu[],
    tecelement:Tecelement[]
}
