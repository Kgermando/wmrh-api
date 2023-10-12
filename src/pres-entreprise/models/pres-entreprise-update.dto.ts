import { Corporate } from "src/corporate/models/corporate.entity";
import { Personnel } from "src/personnel/models/personnel.entity"; 

export class PresEntrepriseUpdateDto { 
    corporate?: Corporate;
    personnel?: Personnel;
    intitule?: string;
    monnaie?: string;
    total_empreints?: string; 
    deboursement?: string; 
    date_debut?: Date;
    date_limit?: Date;
    signature?: string;
    created?: Date;
    update_created?: Date;
    entreprise?: string;
    code_entreprise?: string;
}