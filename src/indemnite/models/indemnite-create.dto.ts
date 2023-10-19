import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity"; 
import { IndemniteContentModel } from "./indemnite.entity";
import { Corporate } from "src/corporate/models/corporate.entity";

export class IndemniteCreateDto {

    corporate: Corporate;

    personnel: Personnel; 

    intitule: string;

    @IsNotEmpty()
    statut: string;

    monnaie: string;
 
    taux_dollard: string;

    content: IndemniteContentModel;

    @IsNotEmpty()
    signature: string;  

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date; 

    @IsNotEmpty()
    entreprise: string;
    
    @IsNotEmpty()
    code_entreprise: string; 
}