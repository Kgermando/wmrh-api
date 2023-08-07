import { Personnel } from "src/personnel/models/personnel.entity";

export class FonctionUpdateDto {
    fonction?: string; 
    personnels?: Personnel[];
    signature?: string;
    created?: Date;
    update_created: Date; 
    entreprise?: string;
    code_entreprise?: string;
}