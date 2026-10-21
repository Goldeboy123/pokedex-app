// Definimos una interface ya que solo vamos a difinir propiedades

import { IStat } from "./stat.model";

/**
 * pokemon.model.ts: Al ser un modelo asegura que los datos se 
 */

export interface Ipokemon {
    id: number;
    name: string;
    typel1: string;
    //?: Indicar que es opcional (Puede no existir)
    typel2?: string;
    sprite: string;
    height: number;
    weight: number;
    abilities: string[];
    hidenAbility?: string;
   stats: IStat[];




}


