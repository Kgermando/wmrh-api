import { Personnel } from "src/personnel/models/personnel.entity";

export class DepartementUpdateDto {
    departement?: string;
    personnels: Personnel[];
    signature?: string;
    created?: Date;
    update_created: Date;
    entreprise?: string;
    code_entreprise?: string;
}