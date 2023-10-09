import { Personnel } from "src/personnel/models/personnel.entity";
import { Corporate } from "src/corporate/models/corporate.entity";

export class SiteLocationUpdateDto {
    site_location?: string;
    manager?: string;
    adresse?: string; 
    personnels?: Personnel[]; 
    corporate?: Corporate;
    signature?: string;
    created?: Date;
    update_created: Date;
    statut_presence?: boolean;
    entreprise?: string; 
    code_entreprise?: string;  
}