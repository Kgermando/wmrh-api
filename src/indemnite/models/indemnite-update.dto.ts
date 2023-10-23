import { Personnel } from "src/personnel/models/personnel.entity"; 
import { Corporate } from "src/corporate/models/corporate.entity";
import { IndemniteContent } from "src/indemnite-content/models/indemnite-content.entity";

export class IndemniteUpdateDto {

    corporate?: Corporate;

    personnel: Personnel; 

    intitule?: string;
    
    statut?: string;

    monnaie?: string;
 
    taux_dollard?: string;

    content?: IndemniteContent[];

    total_a_payer?: string;

    signature?: string;  
 
    created?: Date;
 
    update_created?: Date;
 
    entreprise?: string;
 
    code_entreprise?: string;
}