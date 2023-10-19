import { Personnel } from "src/personnel/models/personnel.entity"; 
import { IndemniteContentModel } from "./indemnite.entity";
import { Corporate } from "src/corporate/models/corporate.entity";

export class IndemniteUpdateDto {

    corporate?: Corporate;

    personnel: Personnel; 

    intitule?: string;
    
    statut?: string;

    monnaie?: string;
 
    taux_dollard?: string;

    content?: IndemniteContentModel;

    signature?: string;  
 
    created?: Date;
 
    update_created?: Date;
 
    entreprise?: string;
 
    code_entreprise?: string;
}