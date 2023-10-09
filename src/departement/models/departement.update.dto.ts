import { Personnel } from "src/personnel/models/personnel.entity";
import { Corporate } from "src/corporate/models/corporate.entity";

export class DepartementUpdateDto {
    departement?: string;
    personnels?: Personnel[];
    corporate?: Corporate;
    signature?: string;
    created?: Date;
    update_created: Date;
    entreprise?: string;
    code_entreprise?: string;
}