import { Corporate } from "src/corporate/models/corporate.entity";
import { Personnel } from "src/personnel/models/personnel.entity";

export class HeureSuppUpdateDto { 

    corporate?: Corporate;

    motif?: string;

    nbr_heures?: number; 

    personnel?: Personnel;

    signature?: string; 

    created?: Date; 

    update_created: Date; 

    entreprise?: string;
 
    code_entreprise?: string;
}