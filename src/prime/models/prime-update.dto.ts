import { Personnel } from "src/personnel/models/personnel.entity";

export class PrimeUpdateDto { 
    intitule?: string;

    montant?: number; 

    personnel?: Personnel;

    signature?: string; 

    created?: Date; 

    update_created?: Date; 

    entreprise?: string;
 
    code_entreprise?: string;
}