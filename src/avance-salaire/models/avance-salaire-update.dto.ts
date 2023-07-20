import { Personnel } from "src/personnel/models/personnel.entity";

export class AvanceSalaireUpdateDto { 
    intitule?: string;

    montant?: string;

    observation?: string;

    personnel?: Personnel;

    signature?: string; 

    created?: Date; 

    update_created?: Date; 

    entreprise?: string;
 
    code_entreprise?: string;
}