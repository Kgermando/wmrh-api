import { IsNotEmpty } from "class-validator";
import { Corporate } from "src/corporate/models/corporate.entity";
import { Personnel } from "src/personnel/models/personnel.entity";

export class HeureSuppCreateDto {

    @IsNotEmpty()
    corporate: Corporate;

    @IsNotEmpty()
    motif: string; 

    @IsNotEmpty()
    nbr_heures: number; 

    @IsNotEmpty()
    personnel: Personnel;

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